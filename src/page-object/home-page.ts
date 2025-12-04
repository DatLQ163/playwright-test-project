import { Page } from "@playwright/test";

export class HomePage {
  private readonly closeAdsButton = this.page.getByRole("button", {
    name: "Close",
  });
  private readonly loginButton = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });
  private readonly pageLogo = this.page.locator(".et_element.et_b_header-logo > a").first();
  private readonly accountIcon = this.page.locator(".header-top .account-type1");

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("");
    // await this.closeAdsButton.waitFor({ state: "visible", timeout: 10000 });
    // await this.closeAdsButton.click();
    await this.pageLogo.click();
  }

  async gotoLoginPage() {
    await this.loginButton.click();
  }

  async gotoAccountPage() {
    await this.accountIcon.click();
  }
}
