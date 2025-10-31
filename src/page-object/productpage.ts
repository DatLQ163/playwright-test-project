import { expect, Page } from "@playwright/test";

export class ProductPage{

    constructor(private page: Page){
    }

    async verifyTypeViewShown(type: String){
        await this.page.waitForTimeout(5000);
        // const viewType = await this.page.locator(`//a[@data-type='${type}']/..`).getAttribute('class');
        const viewType = await this.page.locator(`.switch-${type}`).getAttribute('class');
        expect(viewType).toContain('switcher-active');
    }

    async switchView(option: String){
        await this.page.locator(`.switch-${option}`).click();
    }

    async chooseRandomProduct(){
        const count = await this.page.locator('.content-product').count();
        const randomIndex = Math.floor(Math.random()*count)
        await this.page.locator('.content-product').nth(randomIndex).click();
    }

    async chooseProduct(productName: string) {
        await this.page.getByRole('link', { name: productName, exact: true }).click();
    }


}