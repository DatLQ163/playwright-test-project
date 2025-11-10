import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";
import { AccountPage } from "page-object/account-page";
import { DEPARTMENTS } from "dataTest/Departments";
import { ProductPage } from "page-object/product-page";
import { ProductInfoPage } from "page-object/productInfo-page";
import { CartPage } from "page-object/cart-page";
import { CheckoutPage } from "page-object/checkout-page";
import { OrderPage } from "page-object/order-page";
import { BasePage } from "page-object/common-page";
import { ACCOUNT } from "dataTest/Account";
import { test } from "@playwright/test";
import { PAGE_NAV } from "dataTest/PageNav";

test("TC10 - Verify users can post a review", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const productPage = new ProductPage(page);
  const productInfoPage = new ProductInfoPage(page);

  // Step 1: Open browser and go to https://demo.testarchitect.com/
  await homePage.navigate();

  // Step 2 Login with valid credentials
  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME, ACCOUNT.PASSWORD);

  // Step 3: Go to Shop page
  await accountPage.selectMenuBar(PAGE_NAV.SHOP);

  // Step 4: Click on a product to view detail
  await productPage.chooseProduct("Beats Solo3 Wireless On-Ear");

  // Step 5: Scroll down then click on REVIEWS tab

  // Step 6: Submit a review

  // Step 7: Verify new review
});
