import { expect, test } from '@playwright/test';
import {
  addBackpack,
  enterCheckoutInformation,
  signIn,
  startCheckout,
} from './helpers';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout remains usable at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await signIn(page);
    await addBackpack(page);
    await startCheckout(page);

    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).resolves.toBe(true);

    await enterCheckoutInformation(page);
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
  });
});
