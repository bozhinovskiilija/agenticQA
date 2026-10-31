# Playwright UI Test Framework

## Run tests

```bash
npm run test:smoke
npm run test:e2e:checkout:chromium
npm run test:e2e:checkout
npm run typecheck
npm run test:e2e:report
```

Set `BASE_URL`, `SAUCEDEMO_USERNAME`, or `SAUCEDEMO_PASSWORD` to override the public demo defaults.

The smoke command runs the critical order-completion journey marked `@smoke`. The full suite includes the nine checkout scenarios in the test plan; comparison specs are intentionally excluded from normal runs.

GitHub Actions runs the full regression suite for pushes and pull requests. A manual workflow run can select either `smoke` or `regression`; both choices upload the HTML report and test diagnostics.

## Structure

- `pages/` contains page objects. Each page object owns its locators and user-level actions.
- `fixtures.ts` provides isolated page-object fixtures and the shared logged-in customer fixture.
- `data/checkout-data.ts` stores demo credentials, checkout inputs, products, and route matchers.
- `saucedemo-checkout/` contains independent scenario tests. Assertions and expected outcomes stay in the tests.

Use role- or test-id-based locators, Playwright's auto-waiting actions, and web-first `expect` assertions. Avoid fixed sleeps and shared mutable state between tests. Keep defect assertions enabled: failing acceptance tests report application gaps rather than being skipped or weakened.

Playwright traces, failure screenshots, and videos for failed tests are written under `test-results/playwright/`. The JUnit report is written to `test-results/junit/results.xml`. Open the HTML report with `npm run test:e2e:report` to view failed-test video attachments. Successful test videos are discarded.
