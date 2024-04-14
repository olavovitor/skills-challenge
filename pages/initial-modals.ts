import { Page } from "@playwright/test";
import { elements } from "../helper/elements";

export class InitialModals {
  constructor(private page: Page) {
    this.page = page;
  }

  async openFirstPage() {
    await this.page.goto(elements.INITIAL_PATH);
  }

  async agreeToAllCookies() {
    await this.page
      .getByRole("button", { name: elements.AGREE_BUTTON })
      .click();
  }

  async selectLocationModal(state: string) {
    await this.page.getByLabel(elements.LOCATION_FIELD).selectOption(state);
  }

  async fillPostalCode(postalCode: string) {
    await this.page
      .locator(elements.POSTALCODE_FIELD)
      .getByLabel("", { exact: true })
      .fill(postalCode);
  }

  async selectOwnership() {
    await this.page
      .locator("label")
      .filter({ hasText: elements.OWNERSHIP_LABEL })
      .locator("div")
      .click();
  }

  async closeStateModal() {
    await this.page.locator(elements.CONTINUE_BUTTON).click();
  }
}
