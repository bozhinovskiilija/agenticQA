import { expect, test } from '../fixtures';
import { checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout is blocked when the cart is empty', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.backpack.name);
    await expect(cartPage.emptyCartButton).toBeVisible();

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(checkoutRoutes.cart);
  });
});
