import { Page, expect } from "@playwright/test";
import { elements } from "../helper/elements";
import { constants } from "../helper/constants";
import { Faker, en_AU } from "@faker-js/faker";

export const faker = new Faker({
  locale: [en_AU],
});

import fs from "fs";
import path from "path";

export class CarDetailsPage {
  constructor(private page: Page) {}

  async enquireNow() {
    await this.page.locator(elements.ENQUIRE_NOW_BUTTON).click();
    await expect(
      this.page.locator("h2").getByText("Contact Details and Account Creation") // Ensuring that the Enquire Form is properly displayed
    ).toBeVisible();
  }

  // This time I decided to concentrate all form filling in a single method to make the test more readable
  async fillForm() {
    await this.page
      .getByLabel(elements.FIRST_NAME_LABEL)
      .fill(faker.person.firstName());
    await this.page
      .getByLabel(elements.LAST_NAME_LABEL)
      .fill(faker.person.lastName());
    await this.page
      .getByLabel(elements.EMAIL_LABEL)
      .fill(constants.INVALID_EMAIL);
    await this.page
      .locator(elements.PHONE_ID)
      .getByLabel(elements.PHONE_LABEL)
      .fill(faker.phone.number());
    await this.page
      .getByLabel(elements.POSTALCODE_LABEL)
      .fill(faker.location.zipCode());
    await this.page
      .locator("span")
      .filter({ hasText: elements.AGREEMENT_CHECKBOX })
      .click();
    await expect(
      this.page
        .locator(".wb-type-copy")
        .filter({ hasText: elements.AGREEMENT_CHECKBOX })
    ).toBeChecked();
  }

  async submitForm() {
    await this.page.getByText(elements.PROCEED_BUTTON).click();
  }

  async getModelYear() {
    const model_year = await this.page
      .locator(elements.MODEL_YEAR_LOCATOR)
      .textContent();

    return model_year && model_year !== "" ? model_year : null; // Make sure that the Model Year is not empty and exists
  }

  async getVinNumber() {
    const vin_number = await this.page
      .locator(elements.VIN_NUMBER_LOCATOR)
      .textContent();

    return vin_number && vin_number.trim() !== "" ? vin_number : null; // Make sure that the VIN Number is not empty and exists
  }

  async saveCarDetails() {
    const outputDir = path.join(__dirname, "..", "output");
    const outputFile = path.join(outputDir, "car_details.txt");

    let modelYear = await this.getModelYear();
    let vinNumber = await this.getVinNumber();

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    if (!fs.existsSync(outputFile)) {
      fs.appendFileSync(outputFile, `MODEL_YEAR: ${modelYear}\n`);
      fs.appendFileSync(outputFile, `VIN_NUMBER: ${vinNumber}\n`);
    }
  }
}
