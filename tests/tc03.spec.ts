import { test } from "@playwright/test";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/account-page";
import { BasePage } from "page-object/common-page";
import { CartPage } from "page-object/cart-page";
import { CheckoutPage } from "page-object/checkout-page";
import { HomePage } from "page-object/home-page";
import { LoginPage } from "page-object/login-page";
import { OrderPage } from "page-object/order-page";
import { ProductInfoPage } from "page-object/productInfo-page";
import { ProductPage } from "page-object/product-page";
import { ACCOUNT } from "dataTest/Account";

test("TC03 - Verify users can buy an item using different payment methods (all payment methods", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const productPage = new ProductPage(page);
  const productInfoPage = new ProductInfoPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderPage = new OrderPage(page);
  const basePage = new BasePage(page);

  // Step 1: Open browser and navigate to page
  await homePage.navigate();

  // Step 2: Login with valid credentials
  await homePage.gotoLoginPage();
  await loginPage.login(ACCOUNT.USERNAME, ACCOUNT.PASSWORD);
  await basePage.resetData();

  // Step 3: Go to Shop page
  await accountPage.selectMenuBar(PAGE_NAV.SHOP);

  // Step 4: Select an item and add to cart
  await productPage.chooseProduct("Beats Solo3 Wireless On-Ear");
  await productInfoPage.addToCart();

  // Step 5: Go to Checkout page
  await basePage.gotoCartPage();
  await cartPage.checkOut();

  // Step 6: Choose a different payment method (Direct bank transfer, Cash on delivery)
  await checkoutPage.choosePaymentMethod("Direct bank transfer");

  // Step 7: Complete the payment process
  await checkoutPage.fillBillingDetail({ firstName: "Dat", lastName: "Le", country: "Vietnam", street: "Tran Quoc Toan", town: "Da Nang", phone: "123456789", email: "dat.le@agest.vn" });
  await checkoutPage.clickOnPlaceOrder();

  // Step 8: Verify order confirmation message
  await orderPage.verifyOrderConfirmationMessage();
});
