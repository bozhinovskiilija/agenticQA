import { expect, test } from '@playwright/test';
import { addBackpack, signIn, startCheckout } from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout requires each information field', async ({ page }) => {
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);

    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('First Name is required');

    await page.locator('[data-test="firstName"]').fill('First');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('Last Name is required');

    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
