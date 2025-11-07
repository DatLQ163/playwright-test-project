import { test } from "@playwright/test";
import { ACCOUNT } from "dataTest/Account";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/account-page";
import { CartPage } from "page-object/cart-page";
import { BasePage } from "page-object/common-page";
import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";
import { ProductPage } from "page-object/product-page";
import { ProductInfoPage } from "page-object/productInfo-page";

test("TC08 - Verify users can clear the cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const productInfoPage = new ProductInfoPage(page);
  const accountPage = new AccountPage(page);
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  // Pre-conditions: User added the items into cart
  await homePage.navigate();

  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME, ACCOUNT.PASSWORD);

  await accountPage.selectMenuBar(PAGE_NAV.SHOP);

  await productPage.chooseRandomProduct();
  const productName = await productInfoPage.storeProductName();
  const productPrice = await productInfoPage.storeProductPrice();
  const productAmount = await productInfoPage.storeProductAmount();
  await productInfoPage.addToCart();

  // Step 1: Open browser and go to https://demo.testarchitect.com/
  // Step 2: Login with valid credentials
  // Step 3: Go to Shopping cart page
  await basePage.gotoCartPage();

  // Step 4: Verify items show in table
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);

  // Step 5: Click on Clear shopping cart
  await cartPage.clearShoppingCart();

  // Step 6: Verify empty cart page displays
  await cartPage.verifyCartEmpty();

});
