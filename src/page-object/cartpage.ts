import { expect, Page } from "@playwright/test";

export class CartPage{

    readonly cartItemName = this.page.locator('.product-title');
    readonly cartItemPrice  = this.page.locator('.mobile-price .woocommerce-Price-amount')
    readonly cartItemAmount = this.page.getByRole('spinbutton');
    readonly checkoutButton = this.page.getByRole('link', { name: 'Proceed to checkout' })
    

    constructor(private page: Page){}

    async verifyCartItemDetail(name: string, price: string, amount: any ){
        const label = await this.cartItemName.textContent();
        const number = await this.cartItemAmount.getAttribute('value');
        
        expect(label?.toLowerCase()).toBe(name.toLowerCase());
        await expect(this.cartItemPrice).toHaveText(price);
        expect(number).toBe(amount);
    }

    async checkOut(){
        await this.checkoutButton.click();
    }

}