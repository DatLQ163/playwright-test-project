import { test } from "@playwright/test";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/accountpage";
import { BasePage } from "page-object/basepage";
import { CartPage } from "page-object/cartpage";
import { CheckoutPage } from "page-object/checkoutpage";
import { HomePage } from "page-object/homepage";
import { LoginPage } from "page-object/loginpage";
import { OrderPage } from "page-object/orderpage";
import { ProductInfoPage } from "page-object/productinfopage";
import { ProductPage } from "page-object/productpage";

test("TC05 - Verify orders appear in order history", async ({page})=>{
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const productPage = new ProductPage(page);
    const productInfoPage = new ProductInfoPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderPage = new OrderPage(page);
    const basePage = new BasePage(page);

    // Pre-conditions: order and save product info
    await homePage.navigate();
    await homePage.gotoLoginPage();
    await loginPage.login();
    const orderInfo = await basePage.orderProduct();

    // Step 1: Go to My Account page
    await homePage.gotoAccountPage();

    // Step 2: Click on Orders in left navigation
    

    // Step 3: Verify order details (The orders are displayed in the user’s order history)
})