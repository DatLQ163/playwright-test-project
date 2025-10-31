import { test } from "@playwright/test";
import { PAGE_NAV } from "dataTest/PageNav";
import { AccountPage } from "page-object/accountpage";
import { CartPage } from "page-object/cartpage";
import { CheckoutPage } from "page-object/checkoutpage";
import { HomePage } from "page-object/homepage";
import { LoginPage } from "page-object/loginpage";
import { OrderPage } from "page-object/orderpage";
import { ProductInfoPage } from "page-object/productinfopage";
import { ProductPage } from "page-object/productpage";

test("TC02 - Verify users can buy multiple item successfully", async ({page})=>{
const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const productPage = new ProductPage(page);
    const productInfoPage = new ProductInfoPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderPage = new OrderPage(page);

    // Step 1: Open browser and navigate to page
    await homePage.navigate();

    // Step 2: Login with valid credentials
    await homePage.gotoLoginPage();
    await loginPage.login();

    // Step 3: Go to Shop page
    await accountPage.selectMenuBar(PAGE_NAV.SHOP);

    // Step 4: Select multiple items and add to cart
    await productPage.chooseProduct('Beats Solo3 Wireless On-Ear');
    const prd1 = await productInfoPage.getPrdInfoList();
    await productInfoPage.addToCart();

    await page.goBack();

    await productPage.chooseProduct('Bose SoundLink Mini');
    const prd2 = await productInfoPage.getPrdInfoList();
    await productInfoPage.addToCart();

    // Step 5: Go to the cart and verify all selected items
    await homePage.gotoCartPage();
    const prdList =[prd1,prd2];
    await cartPage.verifyListItems(prdList);

    // Step 6: Proceed to checkout and confirm order
    await cartPage.checkOut();
    await cartPage.verifyListItems(prdList);

    // Step 7: Verify order confirmation message
    await checkoutPage.fillBillingDetail({firstName: 'Dat', lastName: "Le",country: "Vietnam",street: "Tran Quoc Toan",town: "Da Nang",phone: "123456789",email: "dat.le@agest.vn"});
    await checkoutPage.clickOnPlaceOrder();
    await orderPage.verifyOrderPageDisplay();
    await orderPage.verifyListItems(prdList);

})