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

test("TC09 - Verify users can update quantity of product in cart", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const productInfoPage = new ProductInfoPage(page);
  const accountPage = new AccountPage(page);
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  // Step 1: Open browser and go to https://demo.testarchitect.com/
  await homePage.navigate();

  // Step 2: Login with valid credentials
  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME, ACCOUNT.PASSWORD);

  // Step 3: Go to Shop page
  await accountPage.selectMenuBar(PAGE_NAV.SHOP);

  // Step 4: Add a product
  await productPage.chooseProduct("Beats Solo3 Wireless On-Ear");;
  const productName = await productInfoPage.storeProductName();
  const productPrice = await productInfoPage.storeProductPrice();
  let productAmount = await productInfoPage.storeProductAmount();
  console.log(productAmount);
  await productInfoPage.addToCart();

  // Step 5: Go to the cart
  await basePage.gotoCartPage();

  // Step 6: Verify quantity of added product
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);

  // Step 7: Click on Plus(+) button
  await cartPage.changeOrderQuantity("plus");
  productAmount = productAmount + 1;

  // Step 8: Verify quantity of product and SUB TOTAL price
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);

  // Step 9: Enter 4 into quantity textbox then click on UPDATE CART button
  await cartPage.changeOrderQuantity("4");
  productAmount = 4;
  // Step 10: Verify quantity of product is 4 and SUB TOTAL price
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);

  // Step 11: Click on Minus(-) button
  await cartPage.changeOrderQuantity("minus");
  productAmount = productAmount - 1;
  // Step 12: Verify quantity of product and SUB TOTAL price
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);
});
