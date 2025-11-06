import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  private readonly sortDropdown: Locator = this.page.locator("select.orderby");

  constructor(private page: Page) {}

  async verifyTypeViewShown(type: string) {
    await this.page.waitForTimeout(5000);
    // const viewType = await this.page.locator(`//a[@data-type='${type}']/..`).getAttribute('class');
    await expect(this.page
      .locator(`.switch-${type}`)).toHaveClass(/switcher-active/)
  }

  async switchView(option: string) {
    await this.page.locator(`.switch-${option}`).click();
  }

  async chooseRandomProduct() {
    const count = await this.page.locator(".content-product").count();
    const randomIndex = Math.floor(Math.random() * count);
    await this.page.locator(".content-product").nth(randomIndex).click();
  }

  async chooseProduct(productName: string) {
    await this.page
      .getByRole("link", { name: productName, exact: true })
      .click();
  }

  async sortItems(sort: string) {
    // await this.sortDropdown.click();
    await this.sortDropdown.selectOption({ label: "Default sorting" });
    await this.sortDropdown.selectOption({ label: sort });
  }

  async createListPrice(): Promise<string[]> {
    const totalProduct = await this.page.locator(".content-product").count();
    let listPrice: string[] = [];
    for (let i = 1; i < totalProduct; i++) {
      listPrice.push(
        await this.page
          .locator(".content-product .woocommerce-Price-amount")
          .nth(i)
          .innerText()
      );
    }
    return listPrice;
  }

  async verifySortByPrice(type: string, listPrice: string[]) {
    let flag = 0;
    if (type === "low to high") {
      for (let i = 1; i <= listPrice.length; i++) {
        if (listPrice[i] > listPrice[i + 1]) {
          console.log(listPrice[i]);
          console.log(listPrice[i + 1]);
          flag = 1;
        }
      }
    } else {
      for (let i = 1; i < listPrice.length; i++) {
        if (listPrice[i] < listPrice[i + 1]) {
          flag = 1;
        }
      }
    }
    console.log(flag);
    if (flag === 1) {
      return false;
    } else {
      return true;
    }
  }
}
