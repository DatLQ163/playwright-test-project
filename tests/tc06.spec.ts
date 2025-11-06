import { test } from "@playwright/test";
import { BasePage } from "page-object/common-page";
import { HomePage } from "page-object/home-page";
import { OrderPage } from "page-object/order-page";

test("TC06 - Verify users try to buy an item without logging in (As a guest)", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const orderPage = new OrderPage(page);
  const basePage = new BasePage(page);

  // Step 1: Open https://demo.testarchitect.com/
  await homePage.navigate();

  // Step 2: Navigate to 'Shop' or 'Products' section
  // Step 3: Add a product to cart
  // Step 4: Click on Cart button
  // Step 5: Proceed to complete order
  await basePage.orderProduct();

  await orderPage.verifyOrderConfirmationMessage()
});
