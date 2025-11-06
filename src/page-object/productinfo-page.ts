import { Page } from "@playwright/test";

export class ProductInfoPage {
  private readonly addToCartButton = this.page.getByRole("button", {
    name: "ADD TO CART",
  });
  private readonly productName = this.page.locator(".product_title").first();
  private readonly productPrice = this.page
    .getByRole("paragraph")
    .filter({ hasText: "$" });
  private readonly productAmount = this.page.getByRole("spinbutton");

  constructor(private page: Page) {}

  async storeProductName() {
    return this.productName.innerText();
  }

  async storeProductPrice() {
    return this.productPrice.innerText();
  }

  async storeProductAmount() {
    return this.productAmount.getAttribute("value");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getPrdInfoList() {
    return [
      await this.storeProductName(),
      await this.storeProductPrice(),
      await this.storeProductAmount(),
    ];
  }
}
