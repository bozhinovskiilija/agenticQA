import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  get paymentInformation() {
    return this.page.getByText('SauceCard #31337');
  }

  get shippingInformation() {
    return this.page.getByText('Free Pony Express Delivery!');
  }

  get itemSubtotal() {
    return this.page.getByText(/^Item total:/);
  }

  get tax() {
    return this.page.getByText(/^Tax:/);
  }

  get total() {
    return this.page.getByText(/^Total:/);
  }

  get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  get finishButton() {
    return this.page.getByTestId('finish');
  }

  product(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
