import { expect, test } from '../fixtures';
import { checkoutInformation, checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Order overview shows products and totals', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.submit(checkoutInformation);

    await expect(page).toHaveURL(checkoutRoutes.overview);
    await expect(checkoutOverviewPage.product(products.backpack.name)).toBeVisible();
    await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
    await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
    await expect(checkoutOverviewPage.itemSubtotal).toHaveText('Item total: $29.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');

    await checkoutOverviewPage.cancel();
    await expect(page).toHaveURL(checkoutRoutes.inventory);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
