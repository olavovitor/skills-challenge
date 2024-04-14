import { Page, expect } from "@playwright/test";
import { elements } from "../helper/elements";

export class ExplorePage {
  constructor(private page: Page) {}

  async openSearchFilter() {
    await this.page.locator(".show > path").click(); // Different strategy just to vary, but matches based on the page layout aren't recommended
  }

  async selectPreOwnedType() {
    await this.page.locator(elements.PRE_OWNED_LOCATOR).click(); // Different alternative to use the 'hasText'
  }

  async selectColour(colour: string) {
    //Using getByText() or filter() due to the searched elements are not interactives (examples: 'div', 'span', 'p', etc)
    await this.page.locator("p").filter({ hasText: "Colour" }).click();

    await this.page.getByText("Colour 0").click();

    await this.page.getByText(colour, { exact: true }).click(); //This color is not in the beggining of the color list
  }

  async sortBy(sortOption: string) {
    sortOption = sortOption.trim().toLowerCase();
    let sortMethod: string;
    switch (sortOption) {
      case "relevance":
        sortMethod = "Relevance";
        break;
      case "top rated":
        sortMethod = "Top Rated";
        break;
      case "name ascending":
        sortMethod = "Name (ascending)";
        break;
      case "name descending":
        sortMethod = "Name (descending)";
        break;
      case "lowest price":
        sortMethod = "Price (ascending)";
        break;
      case "highest price":
        sortMethod = "Price (descending)";
        break;
      default:
        throw new Error("Invalid sorting option");
    }
    //Strategy to select the dropdown and the option
    const sortingDropdown = this.page.getByLabel(elements.SORT_LABEL);
    await sortingDropdown.selectOption(elements.SORT_METHOD);
    await expect.soft(sortingDropdown).toContainText(sortMethod);
  }

  async selectTheMostExpensiveCar() {
    await this.page
      .locator(".wb-button-text")
      .filter({ hasText: elements.EXPLORE_BUTTON })
      .first() //After sorting by the highest price, the first car is the most expensive
      .click();
  }
}
