import { expect, test } from '../fixtures';
import { checkoutInformation, checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Successful order completes and clears cart @smoke', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    orderConfirmationPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.submit(checkoutInformation);

    await checkoutOverviewPage.finish();
    await expect(page).toHaveURL(checkoutRoutes.confirmation);
    await expect(orderConfirmationPage.confirmationMessage).toBeVisible();
    await expect(orderConfirmationPage.backHomeButton).toBeVisible();
    await expect(orderConfirmationPage.emptyCartButton).toBeVisible();

    await orderConfirmationPage.returnHome();
    await expect(page).toHaveURL(checkoutRoutes.inventory);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
