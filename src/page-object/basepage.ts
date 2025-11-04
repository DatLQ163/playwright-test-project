import { Page } from "@playwright/test";
import { OrderPage } from "./orderpage";
import { AccountPage } from "./accountpage";
import { ProductPage } from "./productpage";
import { ProductInfoPage } from "./productinfopage";
import { CartPage } from "./cartpage";
import { CheckoutPage } from "./checkoutpage";
import { PAGE_NAV } from "dataTest/PageNav";

export class BasePage{
    readonly cartIconButton = this.page.getByRole('link').filter({hasText: '$'});
    readonly checkoutButton = this.page.getByRole('link', { name: 'Proceed to checkout' })
    readonly orderPage = new OrderPage(this.page);
    readonly accountPage = new AccountPage(this.page);
    readonly productPage = new ProductPage(this.page);
    readonly productInfoPage = new ProductInfoPage(this.page);
    readonly cartPage = new CartPage(this.page);
    readonly checkoutPage = new CheckoutPage(this.page);

    constructor(private page: Page){
    }

    async gotoCartPage(){
        await this.cartIconButton.click();
        if (!(await this.checkoutButton.isVisible())){
            await this.cartIconButton.click()
        }
    }

    async orderProduct(){
        await this.accountPage.selectMenuBar(PAGE_NAV.SHOP);
        await this.productPage.chooseProduct('Beats Solo3 Wireless On-Ear');
        await this.productInfoPage.addToCart();
        await this.gotoCartPage();
        await this.cartPage.checkOut();
        await this.checkoutPage.choosePaymentMethod('Direct bank transfer');
        await this.checkoutPage.fillBillingDetail({firstName: 'Dat', lastName: "Le",country: "Vietnam",street: "Tran Quoc Toan",town: "Da Nang",phone: "123456789",email: "dat.le@agest.vn"});
        await this.checkoutPage.clickOnPlaceOrder();
        
        return this.orderPage.getOrderInfo();
    }
}