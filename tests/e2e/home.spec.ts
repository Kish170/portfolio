import { existsSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// Oracles are literal values on purpose: importing them from site config
// would let a wrong config value pass its own test.

test.describe('hero', () => {
  test('shows name, headline, and current role from content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Kishan Rajagunathas');
    await expect(page.getByText('I build data platforms and AI systems.')).toBeVisible();
    await expect(page.getByTestId('current-role')).toHaveText('Data Engineering Intern at Clio');
  });

  test('resume link appears only when the PDF exists', async ({ page, request }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Resume' });
    if (existsSync('public/resume.pdf')) {
      await expect(link).toHaveAttribute('href', '/resume.pdf');
      const res = await request.get('/resume.pdf');
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('application/pdf');
    } else {
      await expect(link).toHaveCount(0);
    }
  });
});

test.describe('experience', () => {
  test('lists companies newest first, grouping roles per company', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#experience');
    const companies = section.locator('[data-company]');
    await expect(companies).toHaveCount(3);
    expect(await companies.evaluateAll((els) => els.map((e) => e.getAttribute('data-company')))).toEqual([
      'Clio',
      'nAIber',
      'theScore',
    ]);

    const thescore = section.locator('[data-company="theScore"]');
    await expect(thescore.locator('[data-role]')).toHaveCount(2);
    await expect(thescore.locator('[data-role]').first()).toContainText('Data Scientist Intern');
    await expect(thescore.locator('[data-role]').last()).toContainText('Software Engineer Intern');
  });

  test('formats date ranges', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#experience');
    await expect(section.locator('[data-company="Clio"] [data-range]').first()).toHaveText('May 2026 - Dec 2026');
    await expect(section.locator('[data-company="nAIber"] [data-range]').first()).toHaveText('Dec 2025 - Present');
  });

  test('shows leadership as its own group', async ({ page }) => {
    await page.goto('/');
    const leadership = page.locator('#leadership');
    await expect(leadership.locator('[data-company]')).toHaveCount(1);
    await expect(leadership).toContainText('Carleton Blueprint');
    await expect(leadership).toContainText('VP of Projects');
    await expect(page.locator('#experience')).not.toContainText('Carleton Blueprint');
  });
});

test.describe('skills', () => {
  test('shows the six resume skill groups in order', async ({ page }) => {
    await page.goto('/');
    const groups = page.locator('#skills [data-skill-group]');
    expect(await groups.evaluateAll((els) => els.map((e) => e.getAttribute('data-skill-group')))).toEqual([
      'Languages',
      'Data Engineering',
      'ML/AI',
      'Databases',
      'Cloud & DevOps',
      'Backend & Web',
    ]);
    await expect(page.locator('[data-skill-group="Data Engineering"]')).toContainText('Databricks');
  });
});

test.describe('contact and education', () => {
  test('links are exact', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link', { name: 'kishanrajagunathas@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:kishanrajagunathas@gmail.com',
    );
    await expect(contact.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/kishanrajagunathas',
    );
    await expect(contact.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/Kish170');
  });

  test('never links to the old LinkedIn URL or the .com domain', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    expect(html).not.toContain('kishan-rajagunathas-54a2a7245');
    expect(html).not.toContain('kishanrajagunathas.com');
  });

  test('shows education', async ({ page }) => {
    await page.goto('/');
    const education = page.locator('#education');
    await expect(education).toContainText('Carleton University');
    await expect(education).toContainText('GPA 3.85/4.00');
    await expect(education).toContainText('Expected Apr 2028');
  });
});

test('every nav link targets a section that exists', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.getByRole('banner').locator('nav a[href^="#"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThanOrEqual(3);
  for (const href of hrefs) {
    await expect(page.locator(href!)).toHaveCount(1);
  }
});

test('content is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Kishan Rajagunathas');
  await expect(page.locator('#experience [data-company="Clio"]')).toBeVisible();
  await expect(page.locator('#skills')).toBeVisible();
  await context.close();
});

test('no horizontal scroll at 375px', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await context.close();
});

test('header controls stay on one line at 375px', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('/');
  const toggle = page.getByRole('banner').locator('[data-theme-toggle]');
  const lineHeight = await toggle.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
  const box = await toggle.boundingBox();
  // One line of text plus vertical padding and borders; a wrap would roughly double it.
  expect(box!.height).toBeLessThan(lineHeight * 1.9);
  const header = await page.getByRole('banner').boundingBox();
  expect(header!.width).toBeLessThanOrEqual(375);
  await context.close();
});

test('nav jumps land with the section title visible below the sticky header', async ({ page }) => {
  await page.goto('/');
  const header = page.getByRole('banner');
  for (const id of ['experience', 'projects', 'skills']) {
    await header.locator(`nav a[href="#${id}"]`).click();
    await page.waitForFunction((target) => location.hash === `#${target}`, id);
    const headerBottom = (await header.boundingBox())!.y + (await header.boundingBox())!.height;
    const titleTop = (await page.locator(`#${id} h2`).boundingBox())!.y;
    expect(titleTop, `#${id} title hidden under header`).toBeGreaterThanOrEqual(headerBottom);
  }
});

test('foundations label uses the small label style', async ({ page }) => {
  await page.goto('/');
  const label = page.locator('#projects .foundations .label').first();
  const size = await label.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBe(12); // --text-xs
});
