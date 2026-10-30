import { expect, test } from '../fixtures';
import { checkoutInformation, checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout remains usable at mobile viewport', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await expect(checkoutInformationPage.firstNameInput).toBeVisible();
    await expect(checkoutInformationPage.lastNameInput).toBeVisible();
    await expect(checkoutInformationPage.postalCodeInput).toBeVisible();
    await expect(page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).resolves.toBe(true);

    await checkoutInformationPage.submit(checkoutInformation);
    await expect(page).toHaveURL(checkoutRoutes.overview);
    await expect(checkoutOverviewPage.finishButton).toBeVisible();
  });
});
