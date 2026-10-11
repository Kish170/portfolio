import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/styleguide', '/projects/naiber/', '/projects/home-lab/', '/projects/internship-watcher/'];

for (const path of pages) {
  test.describe(path, () => {
    test('renders without console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      expect(errors).toEqual([]);
    });

    test('has no horizontal scroll', async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const scheme of ['light', 'dark'] as const) {
      test(`passes axe (incl. WCAG AA contrast) in ${scheme} mode`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
      });
    }

    test('canonical points at the .ca domain', async ({ page }) => {
      await page.goto(path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toMatch(/^https:\/\/www\.kishanrajagunathas\.ca\//);
    });
  });
}

test('styleguide is noindex, home is indexable', async ({ page }) => {
  await page.goto('/styleguide');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test('all content entries load through the collections', async ({ page }) => {
  await page.goto('/styleguide');
  for (const id of ['clio', 'naiber', 'thescore-ds', 'thescore-swe', 'blueprint']) {
    await expect(page.locator(`[data-entry="experience/${id}"]`)).toHaveCount(1);
  }
  for (const id of ['naiber', 'home-lab', 'internship-watcher', 'web-crawler']) {
    await expect(page.locator(`[data-entry="projects/${id}"]`)).toHaveCount(1);
  }
});

test('unknown paths return 404', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
});
