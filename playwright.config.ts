import { defineConfig, devices } from '@playwright/test';

const PORT = 4330;

// Tests run against the production build (astro preview), not the dev server,
// so they exercise what Firebase will actually serve.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // --ignore-lock keeps preview in the foreground: Astro auto-backgrounds it
    // when it detects a coding agent, which Playwright reads as a crash.
    command: `npm run build && npx astro preview --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    // Pin the build month so "current role" assertions do not drift with the calendar.
    env: { PORTFOLIO_NOW: '2026-10' },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
