import { expect, test } from '../fixtures';
import { checkoutRoutes, products } from '../data/checkout-data';

test.describe('SCRUM-101 Checkout', () => {
  test('Checkout requires each information field', async ({
    page,
    loggedInInventoryPage: inventoryPage,
    cartPage,
    checkoutInformationPage,
  }) => {
    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await expect(checkoutInformationPage.firstNameInput).toBeVisible();
    await expect(checkoutInformationPage.lastNameInput).toBeVisible();
    await expect(checkoutInformationPage.postalCodeInput).toBeVisible();

    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');

    await checkoutInformationPage.firstNameInput.fill('First');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Last Name is required');

    await checkoutInformationPage.lastNameInput.fill('Tester');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Postal Code is required');
    await expect(page).toHaveURL(checkoutRoutes.information);
  });
});
