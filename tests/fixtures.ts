import { test as base, expect } from '@playwright/test';
import { credentials } from './data/checkout-data';
import { CartPage } from './pages/cart.page';
import { CheckoutInformationPage } from './pages/checkout-information.page';
import { CheckoutOverviewPage } from './pages/checkout-overview.page';
import { InventoryPage } from './pages/inventory.page';
import { LoginPage } from './pages/login.page';
import { OrderConfirmationPage } from './pages/order-confirmation.page';

type PageObjects = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  orderConfirmationPage: OrderConfirmationPage;
  loggedInInventoryPage: InventoryPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
  loggedInInventoryPage: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/inventory\.html$/);
    await use(inventoryPage);
  },
});

export { expect };
