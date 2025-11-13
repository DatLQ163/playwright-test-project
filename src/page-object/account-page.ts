import { expect, Page } from "@playwright/test";

export class AccountPage {
  private readonly allDepartment = this.page.getByText("All departments");
  private readonly orderNumber = this.page.locator(".order-number");
  private readonly orderDate = this.page.locator(".order-date");
  private readonly orderName = this.page.locator("td.product-name");
  private readonly orderAmount = this.page.locator(".product-quantity");
  private readonly paymentMethod = this.page.locator("tr").filter({ hasText: "Payment method:" }).getByRole("cell");
  private readonly orderPrice = this.page.locator("td.product-total .woocommerce-Price-amount");

  constructor(private page: Page) {}

  async navigateToAllDepartmentsSection() {
    await this.allDepartment.click();
  }

  async selectDepartmentsMenu(pageName: string) {
    await this.page.getByRole("link", { name: ` ${pageName}` }).click();
  }

  async selectMenuBar(pageName: string) {
    await this.page
      .getByRole("link", { name: `${pageName}` })
      .first()
      .click();
  }

  async selectNavigationPage(optionName: string) {
    await this.page.getByRole("link", { name: ` ${optionName}` }).click();
  }

  async verifyOrderHistory(orderInfo: Map<string, string>) {
    await expect(this.page.locator("tr").filter({ hasText: orderInfo.get("number") })).toBeVisible();

    await this.page
      .locator("tr")
      .filter({ hasText: orderInfo.get("number") })
      .getByRole("link", { name: "VIEW" })
      .click();
    expect(await this.orderNumber.innerText()).toContain(orderInfo.get("number"));
    expect(await this.orderDate.innerText()).toContain(orderInfo.get("date"));
    expect(await this.paymentMethod.innerText()).toContain(orderInfo.get("method"));
    expect(await this.orderName.innerText()).toContain(orderInfo.get("name"));
    expect(await this.orderAmount.innerText()).toContain(orderInfo.get("amount"));
    expect(await this.orderPrice.innerText()).toContain(orderInfo.get("price"));
  }
}
