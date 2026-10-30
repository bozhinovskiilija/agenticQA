import { Page } from '@playwright/test';

export class OrderConfirmationPage {
  constructor(private readonly page: Page) {}

  get confirmationMessage() {
    return this.page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  get backHomeButton() {
    return this.page.getByTestId('back-to-products');
  }

  get emptyCartButton() {
    return this.page.getByRole('button', { name: 'Cart, empty' });
  }

  async returnHome() {
    await this.backHomeButton.click();
  }
}
