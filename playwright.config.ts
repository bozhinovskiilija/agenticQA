import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/saucedemo-checkout',
  testIgnore: ['**/*comparison.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit/results.xml' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          Environment: process.env.CI ? 'CI' : 'local',
          'Base URL': process.env.BASE_URL ?? 'https://www.saucedemo.com',
          'Node.js': process.version,
        },
      },
    ],
  ],
  outputDir: 'test-results/playwright',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
