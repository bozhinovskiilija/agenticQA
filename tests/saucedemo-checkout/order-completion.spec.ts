import { expect, test } from '@playwright/test';
import {
  addBackpack,
  enterCheckoutInformation,
  signIn,
  startCheckout,
} from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Successful order completes and clears cart', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);
    await enterCheckoutInformation(page);

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});
