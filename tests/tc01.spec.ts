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

test("TC01 - Verify users can buy an item successfully", async ({ page }) => {
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

  // Step 3: Navigate to All departments section
  await accountPage.navigateToAllDepartmentsSection();

  // Step 4: Select Electronic Components & Supplies
  await accountPage.selectDepartmentsMenu(
    DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES
  );

  // // Step 5: Verify the items should be displayed as a grid
  await productPage.verifyTypeViewShown("grid");

  // // Step 6: Switch view to list
  await productPage.switchView("list");

  // // Step 7: Verify the items should be displayed as a list
  await productPage.verifyTypeViewShown("list");
  await productPage.switchView("grid");

  // Step 8: Select andy item randomly to purchase
  await productPage.chooseRandomProduct();
  const productName = await productInfoPage.storeProductName();
  const productPrice = await productInfoPage.storeProductPrice();
  const productAmount = await productInfoPage.storeProductAmount();

  // Step 9: Click 'Add to Cart'
  await productInfoPage.addToCart();

  // Step 10: Go to the cart
  await basePage.gotoCartPage();

  // await new Promise(r => setTimeout(r, 5000));

  // Step 11: Verify item details in mini content (confirm w/ BA)
  await cartPage.verifyCartItemDetail(productName, productPrice, productAmount);

  // // Step 12: Click on Checkout
  await cartPage.checkOut();

  // // Step 14: Verify item details in order
  await checkoutPage.verifyOrderItemDetail(
    productName,
    productPrice,
    productAmount
  );

  // // Step 15: Fill the billing details with default payment method
  await checkoutPage.fillBillingDetail({
    firstName: "Dat",
    lastName: "Le",
    country: "Vietnam",
    street: "Tran Quoc Toan",
    town: "Da Nang",
    phone: "123456789",
    email: "dat.le@agest.vn",
  });

  // // Step 16: Click on PLACE ORDER
  await checkoutPage.clickOnPlaceOrder();

  // // Step 17: Verify Order status page displays
  await orderPage.verifyOrderPageDisplay();

  // // Step 18: Verify the Order details with billing and item information
  await orderPage.verifyOrderDetail(productName, productPrice, productAmount);
  await orderPage.verifyBillingDetail({
    firstName: "Dat",
    lastName: "Le",
    country: "Vietnam",
    street: "Tran Quoc Toan",
    town: "Da Nang",
    phone: "123456789",
    email: "dat.le@agest.vn",
  });
});
