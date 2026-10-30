import { expect, Page } from '@playwright/test';

export async function signIn(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

export async function addBackpack(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
}

export async function openCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
}

export async function startCheckout(page: Page) {
  await openCart(page);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

export async function enterCheckoutInformation(
  page: Page,
  firstName = 'QA',
  lastName = 'Tester',
  postalCode = '12345',
) {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
  await page.locator('[data-test="continue"]').click();
}
