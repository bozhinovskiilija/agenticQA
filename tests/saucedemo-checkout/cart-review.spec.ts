import { expect, test } from '../fixtures';
import { products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Cart review displays items and actions', async ({
    loggedInInventoryPage: inventoryPage,
    cartPage,
  }) => {
    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.openCart();

    await expect(cartPage.productName(products.backpack.name)).toBeVisible();
    await expect(cartPage.productName(products.bikeLight.name)).toBeVisible();
    await expect(cartPage.productPrice(products.backpack.name, products.backpack.price)).toBeVisible();
    await expect(cartPage.productPrice(products.bikeLight.name, products.bikeLight.price)).toBeVisible();
    await expect(cartPage.quantity(products.backpack.name)).toHaveText('1');
    await expect(cartPage.quantity(products.bikeLight.name)).toHaveText('1');
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    await expect(cartPage.total).toHaveText('Total: $39.98');
  });
});
