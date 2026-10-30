import { expect, test } from '../fixtures';
import { checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout rejects invalid information', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.submit({
      firstName: '!!!',
      lastName: '###',
      postalCode: 'not-a-postcode',
    });

    await expect(page).toHaveURL(checkoutRoutes.information);
    await expect(checkoutInformationPage.errorMessage).toBeVisible();
  });
});
