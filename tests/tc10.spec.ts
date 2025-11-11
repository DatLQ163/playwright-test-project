import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";
import { AccountPage } from "page-object/account-page";
import { ProductPage } from "page-object/product-page";
import { ProductInfoPage } from "page-object/productInfo-page";
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
  await productPage.chooseRandomProduct();

  // Step 5: Scroll down then click on REVIEWS tab
  await productInfoPage.clickReview();
  const randomNumber = Math.floor(Math.random()*1000);

  // Step 6: Submit a review
  await productInfoPage.submitReview('5',`comment-${(randomNumber)}`)

  // Step 7: Verify new review
  await productInfoPage.verifyReview('5',`comment-${(randomNumber)}`);
});

