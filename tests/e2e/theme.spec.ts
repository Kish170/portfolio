import { expect, test, type Page } from '@playwright/test';

const bg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const LIGHT_BG = 'rgb(246, 246, 243)';
const DARK_BG = 'rgb(12, 14, 17)';

test.describe('theme', () => {
  test('follows the system preference when nothing is stored', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    expect(await bg(page)).toBe(DARK_BG);

    await page.emulateMedia({ colorScheme: 'light' });
    expect(await bg(page)).toBe(LIGHT_BG);
  });

  test('toggle switches theme and persists across reloads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(toggle).toBeVisible();

    await toggle.click();
    expect(await bg(page)).toBe(DARK_BG);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();

    await page.reload();
    expect(await bg(page)).toBe(DARK_BG);
  });

  test('stored theme is applied before first paint (no flash)', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.emulateMedia({ colorScheme: 'light' });
    // Capture the attribute as soon as <body> starts parsing.
    await page.addInitScript(() => {
      document.addEventListener('readystatechange', () => {
        (window as Window & { themeAtParse?: string }).themeAtParse ??= document.documentElement.dataset.theme;
      });
    });
    await page.goto('/');
    const atParse = await page.evaluate(() => (window as Window & { themeAtParse?: string }).themeAtParse);
    expect(atParse).toBe('dark');
  });

  test('still works when storage is blocked', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('blocked');
        },
      });
    });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    expect(await bg(page)).toBe(DARK_BG);
    expect(errors).toEqual([]);
  });
});
