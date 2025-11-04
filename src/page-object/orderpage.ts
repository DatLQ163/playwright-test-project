import { expect, Page } from "@playwright/test";

export class OrderPage{
    readonly orderStatus = this.page.locator('.woocommerce-notice--success');
    readonly orderNumber = this.page.locator('.woocommerce-order-overview__order');
    readonly orderDate = this.page.locator('.woocommerce-order-overview__date');
    readonly paymentMethod = this.page.locator('.woocommerce-order-overview__payment-method');
    readonly orderProductName = this.page.locator('.order_item .woocommerce-table__product-name');
    readonly orderProductAmount = this.page.locator('.order_item .product-quantity');
    readonly orderProductPrice = this.page.locator('.order_item .woocommerce-Price-amount');
    readonly billingDetail = this.page.locator('.woocommerce-customer-details');
    readonly orderConfirmationMessage =  this.page.getByText('Thank you. Your order has been received.');

    constructor(private page: Page){}

    async verifyOrderPageDisplay(){
        await this.orderStatus.isVisible();
    }

    async verifyOrderDetail(name: string, price: string , amount: any ){
        const label = await this.orderProductName.innerText();
        const number = await this.orderProductAmount.innerText();
        const cost = await this.orderProductPrice.innerText();

        expect(label.toLowerCase()).toContain(name.toLowerCase());
        expect(cost).toContain(price);
        expect(number).toContain(amount);
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

    async verifyListItems(products: any[][]) {
        for(let i = 0; i < products.length; i++) {
            const actualItemListInfo = [];
            const item = this.page.locator('.order_item').nth(i);

            const itemName = await item.locator('.product-name').innerText();
            actualItemListInfo.push(itemName);

            const itemPrice = await item.locator('.woocommerce-Price-amount').innerText();
            actualItemListInfo.push(itemPrice);

            const itemQuantity = await item.locator('.product-quantity').getAttribute('value');
            actualItemListInfo.push(itemQuantity);

            expect(actualItemListInfo).toEqual(products[i]);
        }
    }

    async verifyOrderConfirmationMessage(){
        await expect(this.orderConfirmationMessage).toBeVisible();
    }

    async getOrderInfo(){
        let orderInfo: string[] = [];
        orderInfo.push(await this.orderNumber.innerText());
        orderInfo.push(await this.orderDate.innerText());
        orderInfo.push(await this.paymentMethod.innerText());
        orderInfo.push(await this.orderProductName.innerText());
        orderInfo.push(await this.orderProductAmount.innerText());
        orderInfo.push(await this.orderProductPrice.innerText());  
        
        return orderInfo;
    }

}