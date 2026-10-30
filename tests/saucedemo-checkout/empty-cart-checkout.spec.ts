import { expect, test } from '@playwright/test';
import { addBackpack, openCart, signIn } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout is blocked when the cart is empty', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await openCart(page);
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/cart\.html/);
  });
});
