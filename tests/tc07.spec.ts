import { test } from "@playwright/test";
import { BasePage } from "page-object/common-page";
import { HomePage } from "page-object/home-page";
import { OrderPage } from "page-object/order-page";

test("TC07 - Ensure proper error handling when mandatory fields are blank", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const orderPage = new OrderPage(page);
  const basePage = new BasePage(page);
  
  // Pre-condition:User is at checkout

  // Step 1: Leave mandatory fields (address, payment info) blank
  // Step 2: Click 'Confirm Order'

  // Step 3: Verify error messages (System should highlight missing fields and show an error message)
});
