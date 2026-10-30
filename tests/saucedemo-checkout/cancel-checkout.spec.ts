import { expect, test } from '@playwright/test';
import { addBackpack, signIn, startCheckout } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Cancel checkout returns to cart', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
