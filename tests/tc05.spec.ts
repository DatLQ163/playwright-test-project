import { test } from "@playwright/test";
import { ACCOUNT } from "dataTest/Account";
import { AccountPage } from "page-object/account-page";
import { BasePage } from "page-object/common-page";
import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";

test("TC05 - Verify orders appear in order history", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const basePage = new BasePage(page);

  // Pre-conditions: order and save product info
  await homePage.navigate();
  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME,ACCOUNT.PASSWORD);
  const orderInfo = await basePage.orderProduct();

  // Step 1: Go to My Account page
  await homePage.gotoAccountPage();

  // Step 2: Click on Orders in left navigation
  await accountPage.selectNavigationPage("RECENT ORDERS");

  // Step 3: Verify order details (The orders are displayed in the user’s order history)
  await accountPage.verifyOrderHistory(orderInfo);
});
