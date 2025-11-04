import { expect, Locator, Page } from "@playwright/test";

export class ProductPage{
    readonly sortDropdown: Locator = this.page.getByRole('combobox', { name: 'Shop order' });

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

    async sortItems(sort: string) {
        await this.sortDropdown.selectOption(sort);
    }

    async createListPrice():Promise<string[]>{
    const totalProduct = await this.page.locator('.content-product').count();
        let listPrice: string[] = [];
        for(let i = 1; i < totalProduct; i++){
            listPrice.push(await this.page.locator('.content-product .woocommerce-Price-amount').nth(i).innerText());
        }
        return listPrice;
    }

    async verifySortByPrice(type: string, listPrice: string[]){
        if(type ='low to high'){
            for(let i = 1; i < listPrice.length; i++){
                if(listPrice[i]<=listPrice[i+1]){
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            for(let i = 1; i < listPrice.length; i++){
                if(listPrice[i]>=listPrice[i+1]){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

}