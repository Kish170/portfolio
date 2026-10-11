import { test as base, expect, type Browser, type BrowserContext, type BrowserContextOptions } from '@playwright/test';

// Tests run the production build, which includes GA4. Intercept Google's
// endpoints so test runs never send real analytics hits, while still
// letting tests assert which tag was requested.
const ANALYTICS = /googletagmanager\.com|google-analytics\.com/;

export async function blockAnalytics(context: BrowserContext): Promise<string[]> {
  const requested: string[] = [];
  await context.route(ANALYTICS, (route) => {
    requested.push(route.request().url());
    return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
  });
  return requested;
}

/** Use instead of browser.newContext() so manual contexts are covered too. */
export async function newContext(browser: Browser, options?: BrowserContextOptions) {
  const context = await browser.newContext(options);
  await blockAnalytics(context);
  return context;
}

export const test = base.extend<{ analyticsRequests: string[] }>({
  analyticsRequests: [
    async ({ context }, use) => {
      await use(await blockAnalytics(context));
    },
    { auto: true },
  ],
});

export { expect };
export type { Page } from '@playwright/test';
