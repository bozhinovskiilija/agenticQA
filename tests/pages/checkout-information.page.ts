import { Page } from '@playwright/test';

export type CheckoutInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutInformationPage {
  constructor(private readonly page: Page) {}

  get firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }

  get continueButton() {
    return this.page.getByTestId('continue');
  }

  get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  get errorMessage() {
    return this.page.getByRole('alert');
  }

  async submit(information: CheckoutInformation) {
    await this.firstNameInput.fill(information.firstName);
    await this.lastNameInput.fill(information.lastName);
    await this.postalCodeInput.fill(information.postalCode);
    await this.continueButton.click();
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
