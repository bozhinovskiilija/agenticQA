# SCRUM-101 SauceDemo Checkout Test Plan

## Application Overview

Validate the SauceDemo customer checkout workflow against SCRUM-101. The application is https://www.saucedemo.com; use standard_user / secret_sauce, add the specified products per scenario, and begin each case from a fresh logged-in session unless noted. Cover cart review, required checkout fields, order overview and totals, successful completion, validation, cancellation, navigation, and responsive layout. Current exploration confirmed the main happy path and first missing-field error; scenarios below include further checks for automated/manual execution.

## Test Scenarios

### 1. SCRUM-101 Checkout

**Seed:** `tests/seed.spec.ts`

#### 1.1. Cart review displays items and actions

**File:** `tests/saucedemo-checkout/cart-review.spec.ts`

**Steps:**
  1. Log in as standard_user / secret_sauce.
    - expect: The Products page is displayed.
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    - expect: Cart badge shows 2 items.
  3. Open the cart.
    - expect: Both product names, descriptions, quantity 1, and unit prices are visible.
    - expect: Continue Shopping and Checkout actions are available.
    - expect: The cart displays a calculated item total of $39.98, as required by AC1.

#### 1.2. Checkout requires each information field

**File:** `tests/saucedemo-checkout/checkout-required-fields.spec.ts`

**Steps:**
  1. Log in, add one product, open the cart, and select Checkout.
    - expect: First Name, Last Name, and Zip/Postal Code fields are visible.
  2. Leave all fields empty and select Continue.
    - expect: Checkout remains on the information page and identifies First Name as required.
  3. Enter a first name only and select Continue.
    - expect: Checkout remains on the information page and identifies Last Name as required.
  4. Enter first and last names only and select Continue.
    - expect: Checkout remains on the information page and identifies Postal Code as required.

#### 1.3. Checkout rejects invalid information

**File:** `tests/saucedemo-checkout/checkout-invalid-data.spec.ts`

**Steps:**
  1. Log in, add one product, open Checkout, and enter names containing special characters with a nonnumeric postal code.
    - expect: The application should show an appropriate validation error and prevent proceeding, as required by AC5; record actual behavior if it accepts the values.

#### 1.4. Order overview shows products and totals

**File:** `tests/saucedemo-checkout/order-overview.spec.ts`

**Steps:**
  1. Log in, add Sauce Labs Backpack to the cart, open Checkout, and enter valid information.
    - expect: The order overview is displayed.
  2. Review the item, payment, shipping, subtotal, tax, and total.
    - expect: Backpack and payment/shipping details are visible.
    - expect: Subtotal is $29.99, tax is $2.40, and total is $32.39.
  3. Select Cancel.
    - expect: Checkout exits to the Products page without completing the order, and the cart item remains.

#### 1.5. Successful order completes and clears cart

**File:** `tests/saucedemo-checkout/order-completion.spec.ts`

**Steps:**
  1. Log in, add one product, enter valid checkout information, and advance to overview.
    - expect: The order overview is displayed.
  2. Select Finish.
    - expect: Order confirmation shows Thank you for your order! and a Back Home action.
    - expect: Cart badge is empty.
  3. Select Back Home.
    - expect: The Products page is displayed and the cart remains empty.

#### 1.6. Cancel checkout returns to cart

**File:** `tests/saucedemo-checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Log in, add one product, open the cart, and select Checkout.
    - expect: Checkout information form is displayed.
  2. Select Cancel.
    - expect: The Cart page is displayed and the cart item remains available.

#### 1.7. Cart navigation preserves items

**File:** `tests/saucedemo-checkout/cart-navigation.spec.ts`

**Steps:**
  1. Log in, add one product, open the cart, then select Continue Shopping.
    - expect: Products page is displayed and the cart badge remains 1.

#### 1.8. Checkout remains usable at mobile viewport

**File:** `tests/saucedemo-checkout/mobile-layout.spec.ts`

**Steps:**
  1. Set viewport to a mobile width, log in, add an item, and complete checkout information entry.
    - expect: Required controls remain visible, usable, and do not overlap or require horizontal scrolling.

#### 1.9. Checkout is blocked when the cart is empty

**File:** `tests/saucedemo-checkout/empty-cart-checkout.spec.ts`

**Steps:**
  1. Log in, add one product, open the cart, and remove the product.
    - expect: The cart is empty.
  2. Select Checkout.
    - expect: Checkout is blocked and the user remains on the cart page, as required by the business rules.
