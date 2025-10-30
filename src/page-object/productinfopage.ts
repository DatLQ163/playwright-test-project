import { Page } from "@playwright/test";

export class ProductInfoPage{
    readonly addToCartButton = this.page.getByRole('button',{name:'ADD TO CART'});
    readonly productName = this.page.locator('.product_title');
    readonly productPrice = this.page.getByRole('paragraph').filter({ hasText: '$' });
    readonly productAmount = this.page.getByRole('spinbutton');

    constructor(private page: Page){
    }

    async storeProductName(){
        return this.productName.innerText();
    }

    async storeProductPrice(){
        return this.productPrice.innerText();
    }

    async storeProductAmount(){
        return this.productAmount.getAttribute('value');
    }

    async addToCart(){
        await this.addToCartButton.click();
    }

}