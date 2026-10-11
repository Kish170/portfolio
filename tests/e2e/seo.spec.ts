import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from './fixtures';

const ORIGIN = 'https://www.kishanrajagunathas.ca';
const PUBLIC_PAGES = ['/', '/projects/naiber/', '/projects/home-lab/', '/projects/internship-watcher/'];

/** Width and height from a PNG's IHDR chunk. */
function pngSize(buf: Buffer) {
  expect(buf.subarray(1, 4).toString()).toBe('PNG');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

for (const path of PUBLIC_PAGES) {
  test.describe(`meta ${path}`, () => {
    test('open graph and twitter tags agree with the page', async ({ page }) => {
      await page.goto(path);
      const meta = (sel: string) => page.locator(sel).getAttribute('content');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

      expect(canonical).toBe(`${ORIGIN}${path}`);
      expect(await meta('meta[property="og:url"]')).toBe(canonical);
      expect(await meta('meta[property="og:title"]')).toBe(await page.title());
      expect(await meta('meta[property="og:description"]')).toBe(await meta('meta[name="description"]'));
      expect(await meta('meta[property="og:site_name"]')).toBe('Kishan Rajagunathas');
      expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
      expect(await meta('meta[property="og:image:alt"]')).toBeTruthy();
    });

    test('has its own 1200x630 preview image on the .ca domain', async ({ page, request }) => {
      await page.goto(path);
      const image = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(image).toMatch(new RegExp(`^${ORIGIN}/og/.+\\.png$`));
      expect(await page.locator('meta[name="twitter:image"]').getAttribute('content')).toBe(image);

      const res = await request.get(image!.replace(ORIGIN, ''));
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('image/png');
      expect(pngSize(await res.body())).toEqual({ width: 1200, height: 630 });
      expect(await page.locator('meta[property="og:image:width"]').getAttribute('content')).toBe('1200');
      expect(await page.locator('meta[property="og:image:height"]').getAttribute('content')).toBe('630');
    });
  });
}

test('each page gets a distinct preview image', async ({ page }) => {
  const images = new Set<string>();
  for (const path of PUBLIC_PAGES) {
    await page.goto(path);
    images.add((await page.locator('meta[property="og:image"]').getAttribute('content'))!);
  }
  expect(images.size).toBe(PUBLIC_PAGES.length);
});

test('home has JSON-LD Person data', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(raw!);
  expect(data).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kishan Rajagunathas',
    url: `${ORIGIN}/`,
    jobTitle: 'Data Engineering Intern',
    worksFor: { '@type': 'Organization', name: 'Clio' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Carleton University' },
  });
  expect(data.sameAs).toEqual(['https://github.com/Kish170', 'https://www.linkedin.com/in/kishanrajagunathas']);
});

test('sitemap lists exactly the public pages', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('xml');
  const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.sort()).toEqual(PUBLIC_PAGES.map((p) => `${ORIGIN}${p}`).sort());
});

test('robots.txt allows crawling and points at the sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('User-agent: *');
  expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  expect(body).not.toMatch(/Disallow: \/\s*$/m);
});

test('GA4 loads with the site measurement ID', async ({ page, analyticsRequests }) => {
  await page.goto('/');
  await expect.poll(() => analyticsRequests.some((u) => u.includes('gtag/js?id=G-F92V5PS9P7'))).toBe(true);
});

test.describe('icons and manifest', () => {
  test('favicon is the site mark, not the Astro default', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', '/favicon.svg');
    const svg = await (await request.get('/favicon.svg')).text();
    expect(svg).not.toContain('M50.4 78.5'); // Astro logo path
    expect(svg).toContain('<svg');
  });

  test('apple touch icon is a 180x180 PNG', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');
    const res = await request.get('/apple-touch-icon.png');
    expect(res.status()).toBe(200);
    expect(pngSize(await res.body())).toEqual({ width: 180, height: 180 });
  });

  test('web manifest is valid and its icons resolve', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/site.webmanifest');
    const manifest = await (await request.get('/site.webmanifest')).json();
    expect(manifest.name).toBe('Kishan Rajagunathas');
    expect(manifest.icons.length).toBeGreaterThan(0);
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src)).status(), icon.src).toBe(200);
    }
  });

  test('theme-color follows light and dark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="theme-color"][media="(prefers-color-scheme: light)"]')).toHaveAttribute(
      'content',
      '#f6f6f3',
    );
    await expect(page.locator('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')).toHaveAttribute(
      'content',
      '#0c0e11',
    );
  });
});

test('built site never references the .com domain or the old LinkedIn URL', () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(html|xml|txt|json|webmanifest|js)$/.test(name)) files.push(full);
    }
  };
  walk('dist');
  expect(files.length).toBeGreaterThan(0);
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    expect(text, f).not.toContain('kishanrajagunathas.com');
    expect(text, f).not.toContain('kishan-rajagunathas-54a2a7245');
  }
});

test('preview images draw the footer inside the frame', async ({ page }) => {
  // The footer's accent dot sits at about (87, 541). If layout pushes the
  // footer off-canvas (it did once: padding added to height), this pixel is
  // background instead of accent green.
  await page.goto('/');
  for (const slug of ['home', 'naiber', 'home-lab', 'internship-watcher']) {
    const rgb = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      return Array.from(ctx.getImageData(87, 541, 1, 1).data.slice(0, 3));
    }, `/og/${slug}.png`);
    // Accent #3fd59a = (63, 213, 154); allow anti-aliasing slack.
    expect(Math.abs(rgb[0]! - 63) + Math.abs(rgb[1]! - 213) + Math.abs(rgb[2]! - 154), `${slug}: ${rgb}`).toBeLessThan(40);
  }
});
