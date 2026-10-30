import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  get cartButton() {
    return this.page.getByTestId('shopping-cart-link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  productCard(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async addProductToCart(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}
