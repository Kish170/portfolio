import { expect, test } from '@playwright/test';

// Literal oracles from the content files; see home.spec.ts for why.
const featured = [
  { id: 'naiber', title: 'nAIber', nodes: 6, edges: 5, status: 'shipped' },
  { id: 'home-lab', title: 'home-lab', nodes: 6, edges: 5, status: 'building', works: 2, planned: 4 },
  { id: 'internship-watcher', title: 'internship-watcher', nodes: 5, edges: 4, status: 'building', works: 3, planned: 3 },
] as const;

test.describe('projects section', () => {
  test('lists projects in content order', async ({ page }) => {
    await page.goto('/');
    const ids = await page
      .locator('#projects [data-project]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('data-project')));
    expect(ids).toEqual(['naiber', 'home-lab', 'internship-watcher', 'web-crawler']);
  });

  test('shows the Building badge only on building projects', async ({ page }) => {
    await page.goto('/');
    for (const p of featured) {
      const badge = page.locator(`#projects [data-project="${p.id}"] [data-badge="building"]`);
      await expect(badge).toHaveCount(p.status === 'building' ? 1 : 0);
    }
  });

  test('featured cards link to their detail page', async ({ page }) => {
    await page.goto('/');
    for (const p of featured) {
      await expect(page.locator(`#projects [data-project="${p.id}"] a[href="/projects/${p.id}/"]`).first()).toBeVisible();
    }
  });

  test('foundations items link to the repo and have no detail page', async ({ page, request }) => {
    await page.goto('/');
    const card = page.locator('#projects [data-project="web-crawler"]');
    await expect(card.getByRole('link', { name: /Spider Search Engine/ })).toHaveAttribute(
      'href',
      'https://github.com/Kish170/Spider-Search-Engine',
    );
    expect((await request.get('/projects/web-crawler/')).status()).toBe(404);
  });
});

for (const p of featured) {
  test.describe(`/projects/${p.id}/`, () => {
    test('renders title, problem, stack, and canonical URL', async ({ page }) => {
      const res = await page.goto(`/projects/${p.id}/`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveText(p.title);
      await expect(page.locator('[data-section="problem"]')).not.toBeEmpty();
      await expect(page.locator('[data-section="stack"] li').first()).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://www.kishanrajagunathas.ca/projects/${p.id}/`,
      );
    });

    if (p.status === 'building') {
      test('splits works today from planned', async ({ page }) => {
        await page.goto(`/projects/${p.id}/`);
        await expect(page.locator('[data-badge="building"]')).toHaveCount(1);
        await expect(page.locator('[data-section="works-today"] li')).toHaveCount(p.works);
        await expect(page.locator('[data-section="planned"] li')).toHaveCount(p.planned);
      });
    }

    test('diagram draws exactly the content nodes and edges', async ({ page }) => {
      await page.goto(`/projects/${p.id}/`);
      const svg = page.locator('[data-diagram] svg:visible');
      await expect(svg).toHaveCount(1);
      await expect(svg.locator('[data-node]')).toHaveCount(p.nodes);
      await expect(svg.locator('[data-edge]')).toHaveCount(p.edges);
    });

    test('lists components with roles without JavaScript', async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(`/projects/${p.id}/`);
      await expect(page.locator('[data-section="components"] dt')).toHaveCount(p.nodes);
      await context.close();
    });
  });
}

test.describe('diagram interaction', () => {
  test('focusing a node explains it and highlights only its edges', async ({ page }) => {
    await page.goto('/projects/naiber/');
    const diagram = page.locator('[data-diagram]').first();
    const svg = diagram.locator('svg:visible');
    const caption = diagram.locator('[data-caption]');

    await svg.locator('[data-node="twilio"]').focus();
    await expect(caption).toContainText('Twilio');
    await expect(caption).toContainText('Telephony. Streams call audio in and out over a WebSocket.');

    // twilio has edges phone->twilio and twilio->voice; nothing else should light up.
    const active = await svg
      .locator('[data-edge][data-active]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('data-edge')));
    expect(active.sort()).toEqual(['phone-twilio', 'twilio-voice']);

    await svg.locator('[data-node="twilio"]').blur();
    await expect(svg.locator('[data-edge][data-active]')).toHaveCount(0);
  });

  test('nodes are reachable by keyboard', async ({ page }) => {
    await page.goto('/projects/naiber/');
    const svg = page.locator('[data-diagram] svg:visible').first();
    const tabbable = await svg.locator('[data-node][tabindex="0"]').count();
    expect(tabbable).toBe(6);
  });

  test('hovering a node explains it', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover does not apply to touch');
    await page.goto('/projects/naiber/');
    const diagram = page.locator('[data-diagram]').first();
    await diagram.locator('svg:visible [data-node="memory"]').hover();
    await expect(diagram.locator('[data-caption]')).toContainText('Memory layer');
  });
});

test.describe('responsive diagram', () => {
  test('uses the vertical layout on narrow screens', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto('/projects/naiber/');
    await expect(page.locator('[data-diagram] svg[data-orientation="vertical"]').first()).toBeVisible();
    await expect(page.locator('[data-diagram] svg[data-orientation="horizontal"]').first()).toBeHidden();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await context.close();
  });

  test('uses the horizontal layout on wide screens', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto('/projects/naiber/');
    await expect(page.locator('[data-diagram] svg[data-orientation="horizontal"]').first()).toBeVisible();
    await expect(page.locator('[data-diagram] svg[data-orientation="vertical"]').first()).toBeHidden();
    await context.close();
  });
});
