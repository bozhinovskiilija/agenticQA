# Playwright UI Test Framework

## Run tests

```bash
npm run test:e2e:checkout:chromium
npm run test:e2e:checkout
npm run typecheck
npm run test:e2e:report
```

Set `BASE_URL`, `SAUCEDEMO_USERNAME`, or `SAUCEDEMO_PASSWORD` to override the public demo defaults.

## Structure

- `pages/` contains page objects. Each page object owns its locators and user-level actions.
- `fixtures.ts` provides isolated page-object fixtures and the shared logged-in customer fixture.
- `data/checkout-data.ts` stores demo credentials, checkout inputs, products, and route matchers.
- `saucedemo-checkout/` contains independent scenario tests. Assertions and expected outcomes stay in the tests.

Use role- or test-id-based locators, Playwright's auto-waiting actions, and web-first `expect` assertions. Avoid fixed sleeps and shared mutable state between tests. Keep defect assertions enabled: failing acceptance tests report application gaps rather than being skipped or weakened.

Playwright traces, failure screenshots, and videos for failed tests are written under the disposable `test-results/playwright/` output folder. Open the HTML report with `npm run test:e2e:report` to view a failed test's video attachment. Successful test videos are discarded.
