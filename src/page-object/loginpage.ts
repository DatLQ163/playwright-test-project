import { Page } from "@playwright/test";
import { ACCOUNT } from "dataTest/Acount";

export class LoginPage{
    private readonly acceptCookiesButton = this.page.getByRole("button", { name: "Accept Cookies" });
    readonly usernameTextbox = this.page.getByRole('textbox', { name: 'Username or email address *' });
    readonly passwordTextbox = this.page.getByRole('textbox', { name: 'Password *' });
    readonly submitButton = this.page.getByRole('button', { name: 'Log in' });

    constructor(private page: Page){
    }

    async login(){
        await this.acceptCookiesButton.waitFor({ state: "visible", timeout: 5_000 }).catch(() => {
      console.log("No cookie consent popup found, continuing...");
    });
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
        await this.usernameTextbox.fill(ACCOUNT.USERNAME);
        await this.passwordTextbox.fill(ACCOUNT.PASSWORD);
        await this.submitButton.click();
    }
}