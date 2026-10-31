# SCRUM-101 Checkout Test Execution Report

**Application:** https://www.saucedemo.com
**Execution date:** 2026-10-31
**Test account:** `standard_user`
**Test plan:** [SauceDemo checkout test plan](../specs/saucedemo-checkout-test-plan.md)

## 1. Executive Summary

The checkout workflow was explored manually and automated with Playwright across the configured Chromium, Firefox, and WebKit projects.

| Measure | Result |
|---|---:|
| Scenarios planned | 9 |
| Manual scenarios exercised | 9 |
| Automated cases per browser | 9 |
| Automated executions across three browsers | 27 |
| Final automated passed | 18 |
| Final automated failed | 9 |
| Blocked | 0 |

The same three acceptance gaps reproduced in all three browser projects: no cart total is shown, invalid checkout values are accepted, and checkout is allowed with an empty cart. The other six cases passed in each browser. These figures were confirmed in a fresh run on 2026-10-31; the suite now also emits JUnit results at `test-results/junit/results.xml`.

## 2. Manual Exploratory Results

| Scenario | Result | Observation |
|---|---|---|
| Cart review | **Fail** | Product name, quantity, unit price, and cart actions were present. The cart had no calculated total, contrary to AC1. The automated two-item check confirmed this. |
| Required checkout fields | **Pass** | Empty fields produced sequential errors for First Name, Last Name, and Postal Code; the flow remained on the information page. |
| Invalid checkout information | **Fail** | Names containing special characters and a nonnumeric postal code were accepted and advanced to the overview. |
| Order overview | **Pass** | Item, payment, shipping, item total ($29.99), tax ($2.40), and total ($32.39) were displayed. |
| Cancel from overview | **Pass** | Cancel returned to Products and retained the cart item. |
| Successful order | **Pass** | Confirmation and Back Home appeared; the cart was empty after completion. |
| Cancel from checkout information / continue shopping | **Pass** | Cancel returned to Cart with the item retained; Continue Shopping returned to Products and retained the cart. |
| Mobile layout | **Pass** | At 390 × 844, checkout controls remained usable and the automated width check found no horizontal overflow. |
| Empty-cart checkout | **Fail** | After removing the only item, Checkout remained available and navigated to the information page. Cancel from this invalid state redirected to login with a protected-route error. |

### Evidence

- [Empty-cart cancel redirect](./evidence/empty-cart-cancel-redirect.png)

## 3. Automated Test Results

The generated suite is in `tests/saucedemo-checkout/`. It uses the stable `data-test` selectors observed during exploration and the existing Playwright project configuration.

### Fresh run across configured browsers

| Browser project | Passed | Failed | Total |
|---|---:|---:|---:|
| Chromium | 6 | 3 | 9 |
| Firefox | 6 | 3 | 9 |
| WebKit | 6 | 3 | 9 |
| **Total** | **18** | **9** | **27** |

The smoke-tagged order-completion journey was also run separately across all three browser projects: **3 passed, 0 failed**.

The failures were consistent across browsers:

1. `Cart review displays items and actions` — expected the two-item cart total `$39.98`; no cart-level total was present.
2. `Checkout rejects invalid information` — invalid values advanced to `checkout-step-two.html` rather than remaining on the information page with a validation error.
3. `Checkout is blocked when the cart is empty` — checkout advanced to `checkout-step-one.html` after the only item was removed.

Failed assertions remain enabled because they represent observed acceptance-criteria gaps, not selector or timing defects. No application source is present in this workspace to fix the SauceDemo behavior. Failed tests produced screenshots, videos, and traces under `test-results/playwright/`.

## 4. Defects Log

### QA-101-01 — Cart does not show calculated total

- **Severity:** Medium
- **Description:** The cart lists products and unit prices but does not display the calculated total required by AC1.
- **Steps to reproduce:** Log in, add the Backpack and Bike Light, open the cart.
- **Expected:** A calculated cart total of `$39.98` is visible.
- **Actual:** No cart-level total is shown.
- **Evidence:** Automated failure in `cart-review.spec.ts`; cart contents and prices were visible during exploration.
- **Environment:** SauceDemo; Playwright Chromium, Firefox, WebKit.

### QA-101-02 — Invalid checkout data is accepted

- **Severity:** Medium
- **Description:** Special-character names and a nonnumeric postal code pass checkout information validation.
- **Steps to reproduce:** Add an item, open Checkout, enter `!!!`, `###`, and `not-a-postcode`, then select Continue.
- **Expected:** An appropriate validation error prevents proceeding, per AC5.
- **Actual:** The application advances to the order overview.
- **Evidence:** Automated failure in `checkout-invalid-data.spec.ts`.
- **Environment:** SauceDemo; Playwright Chromium, Firefox, WebKit.

### QA-101-03 — Checkout is allowed with an empty cart

- **Severity:** Medium
- **Description:** The Checkout action remains available after removing the cart's only item.
- **Steps to reproduce:** Add an item, open the cart, remove the item, select Checkout.
- **Expected:** Checkout is blocked while the cart is empty.
- **Actual:** The information form opens. Cancel from this state also redirects to login with a protected-route error instead of returning to the cart.
- **Evidence:** [Cancel redirect screenshot](./evidence/empty-cart-cancel-redirect.png) and automated failure in `empty-cart-checkout.spec.ts`.
- **Environment:** SauceDemo; Playwright Chromium, Firefox, WebKit.

## 5. Test Coverage Analysis

| Requirement | Coverage | Result |
|---|---|---|
| AC1 — Cart review and total | Manual + automated | **Partial / Fail:** item details and actions are present; cart total is missing. |
| AC2 — Required information | Manual + automated | **Pass:** each missing field produces a field-specific error. |
| AC3 — Order overview and totals | Manual + automated | **Pass:** overview amounts and payment/shipping details are displayed. |
| AC4 — Order completion | Manual + automated | **Pass:** confirmation appears and the cart clears. |
| AC5 — Invalid data validation | Manual + automated | **Fail:** malformed data is accepted. |
| Empty-cart business rule | Manual + automated | **Fail:** checkout is allowed with no items. |
| Cancel and continue-shopping navigation | Manual + automated | **Pass:** expected destinations and cart preservation were observed for populated-cart flows. |
| Mobile checkout | Manual + automated | **Pass:** tested at 390 × 844. |
| Login-required route handling | Exploratory observation | **Partial:** an empty-cart cancel path reached login with an access error; a dedicated unauthenticated deep-link test remains a gap. |

## 6. Summary and Recommendations

The core happy path works in all three configured browser projects, including required-field messages, overview calculations, order confirmation, and cart clearing. Before treating checkout as acceptance-complete, address the three logged gaps: display the cart total, validate malformed checkout data, and prevent checkout with an empty cart. Add a dedicated unauthenticated-route test and re-run the suite after application fixes.

## Execution Details

The tests were run from the workspace with:

```text
npm run typecheck
npm run test:e2e:checkout
```

The full run executed 27 cases (9 scenarios × 3 browser projects): 18 passed and 9 failed. Each browser had the same 6-pass / 3-fail result. The failures match the three application gaps listed above. The smoke-tagged order-completion test is available through `npm run test:smoke`.
