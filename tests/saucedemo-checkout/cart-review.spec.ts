import { expect, test } from '@playwright/test';
import { addBackpack, openCart, signIn } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Cart review displays items and actions', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await openCart(page);

    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByText('$9.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    await expect(page.getByText('Total: $39.98', { exact: true })).toBeVisible();
  });
});
