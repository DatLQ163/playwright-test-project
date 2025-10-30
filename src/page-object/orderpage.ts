import { expect, Page } from "@playwright/test";

export class OrderPage{
    readonly orderStatus = this.page.locator('.woocommerce-notice--success');
    readonly orderProductName = this.page.locator('.order_item .woocommerce-table__product-name');
    readonly orderProductAmount = this.page.locator('.order_item .product-quantity');
    readonly orderProductPrice = this.page.locator('.order_item .woocommerce-Price-currencySymbol');
    readonly billingDetail = this.page.locator('.woocommerce-customer-details');

    constructor(private page: Page){}

    async verifyOrderPageDisplay(){
        await this.orderStatus.isVisible();
    }

    async verifyOrderDetail(name: string, amount: string, price: any){
        expect(this.orderProductName).toBe(name);
        expect(this.orderProductPrice).toBe(price);
        expect(this.orderProductAmount).toBe(amount);
    }

    async verifyBillingDetail(billingInfo:{firstName: string; lastName: string; country: string;street:string; town: string; phone: string; email: string}){
        expect(this.billingDetail).toContainText(billingInfo.firstName)
        expect(this.billingDetail).toContainText(billingInfo.lastName)
        expect(this.billingDetail).toContainText(billingInfo.country)
        expect(this.billingDetail).toContainText(billingInfo.street)
        expect(this.billingDetail).toContainText(billingInfo.town)
        expect(this.billingDetail).toContainText(billingInfo.email)
        expect(this.billingDetail).toContainText(billingInfo.phone)
    }
}