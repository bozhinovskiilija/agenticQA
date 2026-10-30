import { expect, test } from '@playwright/test';
import { addBackpack, openCart, signIn } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Cart navigation preserves items', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await openCart(page);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
