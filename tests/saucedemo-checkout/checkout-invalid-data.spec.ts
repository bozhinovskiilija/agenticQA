import { expect, test } from '@playwright/test';
import { addBackpack, signIn, startCheckout } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout rejects invalid information', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);

    await page.locator('[data-test="firstName"]').fill('!!!');
    await page.locator('[data-test="lastName"]').fill('###');
    await page.locator('[data-test="postalCode"]').fill('not-a-postcode');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
