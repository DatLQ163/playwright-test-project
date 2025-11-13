import { test } from "@playwright/test";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/account-page";
import { CartPage } from "page-object/cart-page";
import { CheckoutPage } from "page-object/checkout-page";
import { BasePage } from "page-object/common-page";
import { HomePage } from "page-object/home-page";
import { OrderPage } from "page-object/order-page";
import { ProductPage } from "page-object/product-page";
import { ProductInfoPage } from "page-object/productInfo-page";

test("TC07 - Ensure proper error handling when mandatory fields are blank", async ({ page }) => {
  const homePage = new HomePage(page);
  const orderPage = new OrderPage(page);
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const productInfoPage = new ProductInfoPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const accountPage = new AccountPage(page);

  // Pre-condition:go to checkout product page
  await homePage.navigate();
  await accountPage.selectMenuBar(PAGE_NAV.SHOP);
  await productPage.chooseProduct("Beats Solo3 Wireless On-Ear");
  await productInfoPage.addToCart();
  await basePage.gotoCartPage();
  await cartPage.checkOut();
  // Step 1: Leave mandatory fields (address, payment info) blank
  await checkoutPage.fillBillingDetail({
    firstName: "Dat",
    lastName: "Le",
    country: "Vietnam",
    street: "Tran Quoc Toan",
    town: "Da Nang",
    phone: "123456789",
    email: "",
  });

  // Step 2: Click 'Confirm Order'
  await checkoutPage.clickOnPlaceOrder();

  // Step 3: Verify error messages (System should highlight missing fields and show an error message)
  await orderPage.verifyEmailErrorMessage();
});
