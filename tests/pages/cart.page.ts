import { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get checkoutButton() {
    return this.page.getByTestId('checkout');
  }

  get continueShoppingButton() {
    return this.page.getByTestId('continue-shopping');
  }

  get emptyCartButton() {
    return this.page.getByRole('button', { name: 'Cart, empty' });
  }

  get total() {
    return this.page.getByText(/^Total:/);
  }

  item(name: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  productName(name: string): Locator {
    return this.item(name).getByRole('button', { name });
  }

  productPrice(name: string, price: string): Locator {
    return this.item(name).getByText(price, { exact: true });
  }

  quantity(name: string): Locator {
    return this.item(name).locator('.cart_quantity');
  }

  async removeProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
