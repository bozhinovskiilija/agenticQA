import { expect, test } from '@playwright/test';
import {
  addBackpack,
  enterCheckoutInformation,
  signIn,
  startCheckout,
} from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Order overview shows products and totals', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);
    await enterCheckoutInformation(page);

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
