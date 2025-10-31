import { expect, Page } from "@playwright/test";

export class CheckoutPage{
    readonly cartCountDownExpiredMessage = this.page.locator('.cart-countdown-expired-message')
        readonly orderItemName = this.page.locator('.cart_item .product-name');
        readonly orderItemPrice = this.page.locator('.cart_item .product-total')
        readonly orderItemAmount = this.page.locator('.cart_item .product-quantity');
        readonly firstName = this.page.getByRole('textbox', { name: 'First name *' });
        readonly lastName = this.page.getByRole('textbox', { name: 'Last name *' });
        readonly countryBox = this.page.getByRole('combobox', { name: 'Country / Region' });
        readonly country = this.page.getByRole('option', { name: 'Vietnam' });
        readonly town = this.page.getByRole('textbox', { name: 'Town / City *' });
        readonly street = this.page.getByRole('textbox', { name: 'Street address *' });
        readonly phone = this.page.getByRole('textbox', { name: 'Phone *' });
        readonly email = this.page.getByRole('textbox', { name: 'Email address *' });
        readonly placeOrder = this.page.getByRole('button', { name: 'Place order' });

    constructor(private page: Page){
        
    }

    async verifyCheckOutPageDisplay(){
        await this.cartCountDownExpiredMessage.isVisible();
    }

    async verifyOrderItemDetail(name: string, price: string, amount: any){
        const label = await this.orderItemName.innerText();
        const cost = await this.orderItemPrice.innerText();
        const number = await this.orderItemAmount.innerText();    

        expect(label.toLowerCase()).toContain(name.toLowerCase());
        expect(cost).toContain(price);
        expect(number).toContain(amount);
    }

    async fillBillingDetail(billingInfo:{firstName: string; lastName: string; country: string;street:string; town: string; phone: string; email: string}){
        await this.firstName.fill(billingInfo.firstName);
        await this.lastName.fill(billingInfo.lastName);
        await this.countryBox.click();
        await this.page.getByRole('option', { name: `${billingInfo.country}` });
        await this.street.fill(billingInfo.street);
        await this.town.fill(billingInfo.town);
        await this.phone.fill(billingInfo.phone);
        await this.email.fill(billingInfo.email);
    }

    async clickOnPlaceOrder(){
        await this.placeOrder.click();
    }

    async verifyListItems(products: any[][]) {
        for(let i = 0; i < products.length; i++) {
            const actualItemListInfo = [];
            const item = this.page.locator('.cart_item').nth(i);

            const itemName = await item.locator('.product-name').innerText();
            actualItemListInfo.push(itemName);

            const itemPrice = await item.locator('.woocommerce-Price-amount').innerText();
            actualItemListInfo.push(itemPrice);

            const itemQuantity = await item.locator('.product-quantity').getAttribute('value');
            actualItemListInfo.push(itemQuantity);

            expect(actualItemListInfo).toEqual(products[i]);
        }
    }

}