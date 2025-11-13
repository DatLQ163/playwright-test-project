import { Page } from "@playwright/test";
import { ACCOUNT } from "dataTest/Account";

export class LoginPage {
  private readonly acceptCookiesButton = this.page.getByRole("button", {
    name: "Accept Cookies",
  });
  private readonly usernameTextbox = this.page.getByRole("textbox", {
    name: "Username or email address *",
  });
  private readonly passwordTextbox = this.page.getByRole("textbox", {
    name: "Password *",
  });
  private readonly submitButton = this.page.getByRole("button", {
    name: "Log in",
  });

  constructor(private page: Page) {}

  async login(user: string, pass: string) {
    await this.acceptCookiesButton.waitFor({ state: "visible", timeout: 5_000 }).catch(() => {
      console.log("No cookie consent popup found, continuing...");
    });
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
    await this.usernameTextbox.fill(user);
    await this.passwordTextbox.fill(pass);
    await this.submitButton.click();
  }
}
