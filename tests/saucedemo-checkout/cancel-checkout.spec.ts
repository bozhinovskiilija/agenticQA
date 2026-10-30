import { expect, test } from '../fixtures';
import { checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Cancel checkout returns to cart', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.cancel();
    await expect(page).toHaveURL(checkoutRoutes.cart);
    await expect(cartPage.productName(products.backpack.name)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
