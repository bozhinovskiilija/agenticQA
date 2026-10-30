import { expect, test } from '../fixtures';
import { checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Cart navigation preserves items', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();

    await cartPage.continueShopping();
    await expect(page).toHaveURL(checkoutRoutes.inventory);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
