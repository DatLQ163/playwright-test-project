import { expect, test } from "@playwright/test";
import { ACCOUNT } from "dataTest/Account";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/account-page";
import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";
import { ProductPage } from "page-object/product-page";

test("TC04 - Verify users can sort items by price", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const productPage = new ProductPage(page);

  // Step 1: Open browser and navigate to page

  await homePage.navigate();

  // Step 2: Login with valid credentials
  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME, ACCOUNT.PASSWORD);

  // Step 3: Go to Shop page
  await accountPage.selectMenuBar(PAGE_NAV.SHOP);

  // Step 4: Switch view to list
  await productPage.switchView("list");

  // Step 5: Sort items by price (low to high / high to low)
  await productPage.sortItems("Sort by price: low to high");

  // Step 6: Verify order of items
  await new Promise((r) => setTimeout(r, 5000));
  const listPrice = await productPage.createListPrice();
  const result = await productPage.verifySortByPrice("low to high", listPrice);
  expect(result).toEqual(true);
});
