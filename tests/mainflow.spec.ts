import { test as base, expect } from "@playwright/test";
import { InitialModals } from "../pages/initial-modals.ts";
import { ExplorePage } from "../pages/explore-page.po.ts";
import { CarDetailsPage } from "../pages/car-details-page.po.ts";
import { constants } from "../helper/constants.ts";

// Using 3 different Fixtures as Page Objects
type MyTestFixtures = {
  initialModals: InitialModals;
  explorePage: ExplorePage;
  carDetailsPage: CarDetailsPage;
};

const test = base.extend<MyTestFixtures>({
  initialModals: async ({ page }, use) => {
    const initialModals = new InitialModals(page);
    await initialModals.openFirstPage();
    await initialModals.agreeToAllCookies();
    await use(initialModals);
  },
  explorePage: async ({ page }, use) => {
    const explorePage = new ExplorePage(page);
    await use(explorePage);
  },
  carDetailsPage: async ({ page }, use) => {
    const carDetailsPage = new CarDetailsPage(page);
    await use(carDetailsPage);
  },
});

test("Filter by a model and request a dealer contact", async ({
  initialModals,
  explorePage,
  carDetailsPage,
  page,
}) => {
  test.setTimeout(45000); //As I understood reading the challenge proposal, there should be just one test which takes too long due to many loadings and page transitions.

  /* The following actions to define the customer location are separated in different methods to make the test more readable.
  This way also helps in case of a change in the flow, making it easier to find the right place to update. */
  await initialModals.selectLocationModal(constants.LOCATION);
  await initialModals.fillPostalCode(constants.POSTALCODE);
  await initialModals.selectOwnership();
  await initialModals.closeStateModal();
  await expect(
    page
      .locator("a")
      .filter({ hasText: `Your Location: ${constants.LOCATION}` }) // Ensuring that the location is the same informed previously (see constants.ts file)
  ).toBeVisible();

  /* Page Transition:
  > Searching for an specific color */
  await explorePage.openSearchFilter();
  await explorePage.selectPreOwnedType();
  await explorePage.selectColour(constants.COLOUR);
  await expect(
    page.locator("#srp-result").getByText("Available Vehicles") // Avoiding expliciting the number of vehicles, because that number already changed last week
  ).toBeVisible();

  await explorePage.sortBy(constants.SORT_OPTION); //Sorting the results by price descending
  await explorePage.selectTheMostExpensiveCar();
  await expect(
    page
      .locator(".wb-content-switch")
      .filter({ hasText: "Technical Specifications" })
  ).toBeVisible();

  /* Page Transition
  > Checking the car details */
  await carDetailsPage.saveCarDetails(); //Storing the car details in a file
  await carDetailsPage.enquireNow();
  await carDetailsPage.fillForm();
  await expect(
    page.getByText(
      "Please enter a valid email address using a minimum of six characters."
    )
  ).toBeVisible();

  await carDetailsPage.submitForm();
  await expect(
    page
      .locator(".dcp-error-message__error-hint")
      .filter({ hasText: "An error has occurred" })
      .and(page.getByText("Please check the following sections:"))
  ).toBeVisible();
});
