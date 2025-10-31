import { Page } from "@playwright/test";

export class HomePage{
    readonly closeAdsButton = this.page.getByRole('button',{name:'Close'});
    readonly loginButton = this.page.getByRole('link', { name: 'Log in / Sign up' });
    readonly cartIconButton = this.page.getByRole('link').filter({hasText: '$'});
    readonly pageLogo = this.page.locator('.et_element.et_b_header-logo > a').first();

    constructor(private page: Page){
    }

    async navigate(){
        await this.page.goto('https://demo.testarchitect.com/');
        await this.closeAdsButton.waitFor({state: "visible", timeout: 5000});
        await this.closeAdsButton.click();
        await this.pageLogo.click();
    }

    async gotoLoginPage(){
        await this.loginButton.click();
    }

    async gotoCartPage(){
        await this.cartIconButton.click();

    }

}