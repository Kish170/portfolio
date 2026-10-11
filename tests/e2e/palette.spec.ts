import { existsSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// 5 sections + 4 projects + copy email, GitHub, LinkedIn, toggle theme (+ resume once ticket 09 lands).
const EXPECTED_COUNT = 13 + (existsSync('public/resume.pdf') ? 1 : 0);

const palette = (page: Page) => page.getByRole('dialog', { name: 'Command palette' });
const input = (page: Page) => palette(page).getByRole('combobox');
const options = (page: Page) => palette(page).getByRole('option');

async function open(page: Page) {
  await page.keyboard.press('ControlOrMeta+k');
  await expect(palette(page)).toBeVisible();
}

test.describe('command palette', () => {
  test('opens with the shortcut, focuses search, lists every command', async ({ page }) => {
    await page.goto('/');
    await expect(palette(page)).toBeHidden();
    await open(page);
    await expect(input(page)).toBeFocused();
    await expect(options(page)).toHaveCount(EXPECTED_COUNT);
    await expect(input(page)).toHaveAttribute('aria-expanded', 'true');
  });

  test('the shortcut toggles it closed again', async ({ page }) => {
    await page.goto('/');
    await open(page);
    await page.keyboard.press('ControlOrMeta+k');
    await expect(palette(page)).toBeHidden();
  });

  test('filters as you type and shows an empty state', async ({ page }) => {
    await page.goto('/');
    await open(page);
    await input(page).fill('kubernetes');
    await expect(options(page)).toHaveCount(1);
    await expect(options(page).first()).toContainText('home-lab');

    await input(page).fill('zzz');
    await expect(options(page)).toHaveCount(0);
    await expect(palette(page).getByText('No results')).toBeVisible();
  });

  test('arrow keys move the active option, announced via aria-activedescendant', async ({ page }) => {
    await page.goto('/');
    await open(page);
    const first = await options(page).nth(0).getAttribute('id');
    const second = await options(page).nth(1).getAttribute('id');
    await expect(input(page)).toHaveAttribute('aria-activedescendant', first!);
    await page.keyboard.press('ArrowDown');
    await expect(input(page)).toHaveAttribute('aria-activedescendant', second!);
    await expect(options(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp'); // wraps to the last option
    const last = await options(page).last().getAttribute('id');
    await expect(input(page)).toHaveAttribute('aria-activedescendant', last!);
  });

  test('Enter jumps to a section and closes', async ({ page }) => {
    await page.goto('/');
    await open(page);
    await input(page).fill('skills');
    await page.keyboard.press('Enter');
    await expect(palette(page)).toBeHidden();
    await expect(page).toHaveURL(/#skills$/);
  });

  test('section commands work from a project page', async ({ page }) => {
    await page.goto('/projects/naiber/');
    await open(page);
    await input(page).fill('experience');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/#experience$/);
  });

  test('clicking a project opens its page', async ({ page }) => {
    await page.goto('/');
    await open(page);
    await input(page).fill('naiber');
    await options(page).filter({ hasText: 'nAIber' }).first().click();
    await expect(page).toHaveURL(/\/projects\/naiber\/$/);
  });

  test('Esc closes and returns focus to where it was', async ({ page }) => {
    await page.goto('/');
    const github = page.locator('.hero').getByRole('link', { name: 'GitHub' });
    await github.focus();
    await open(page);
    await page.keyboard.press('Escape');
    await expect(palette(page)).toBeHidden();
    await expect(github).toBeFocused();
  });

  test('Tab cannot move focus outside while open', async ({ page }) => {
    await page.goto('/');
    await open(page);
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => !!document.activeElement?.closest('dialog[open]'));
      // The browser may move focus to its own chrome; it must never land on the page behind.
      const onPage = await page.evaluate(() => {
        const el = document.activeElement;
        return !!el && el !== document.body && !el.closest('dialog');
      });
      expect(onPage, `tab ${i + 1} escaped to the page`).toBe(false);
      if (!inside) break;
    }
  });

  test('copy email puts the exact address on the clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions are Chromium-only in Playwright');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await open(page);
    await input(page).fill('copy email');
    await page.keyboard.press('Enter');
    await expect(palette(page).getByText('Copied kishanrajagunathas@gmail.com')).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('kishanrajagunathas@gmail.com');
  });

  test('toggle theme runs from the palette', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await open(page);
    await input(page).fill('theme');
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('external commands point at the right URLs', async ({ page }) => {
    await page.goto('/');
    await open(page);
    await expect(options(page).filter({ hasText: 'GitHub' })).toHaveAttribute('data-href', 'https://github.com/Kish170');
    await expect(options(page).filter({ hasText: 'LinkedIn' })).toHaveAttribute(
      'data-href',
      'https://www.linkedin.com/in/kishanrajagunathas',
    );
  });

  test('header button opens it on desktop and is hidden on phones', async ({ page, isMobile }) => {
    await page.goto('/');
    const button = page.getByRole('banner').getByRole('button', { name: 'Open command palette' });
    if (isMobile) {
      await expect(button).toBeHidden();
      return;
    }
    await button.click();
    await expect(palette(page)).toBeVisible();
  });

  for (const scheme of ['light', 'dark'] as const) {
    test(`passes axe while open in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto('/');
      await open(page);
      const results = await new AxeBuilder({ page }).include('dialog').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
    });
  }
});
