import { expect, Locator, Page } from "@playwright/test";
import { Product } from "type/productInfo-interface";

export class ProductInfoPage {
  private readonly addToCartButton = this.page.getByRole("button", {
    name: "ADD TO CART",
  });
  private readonly productName = this.page.locator(".product_title").first();
  private readonly productPrice = this.page.locator(`//div[@class='fixed-content']//span[@class='woocommerce-Price-amount amount' and not(ancestor::del)]`);
  private readonly productAmount = this.page.getByRole("spinbutton");
  private readonly reviewButton = this.page.locator("#tab_reviews");
  private readonly reviewTextBox = this.page.getByRole("textbox", {
    name: "Your review *",
  });
  private readonly submitReviewButton = this.page.getByRole("button", {
    name: "Submit",
  });

  constructor(private page: Page) {}

  async storeProductName() {
    return this.productName.innerText();
  }

  async storeProductPrice() {
    return this.productPrice.first().innerText();
  }

  async storeProductAmount() {
    return String(await this.productAmount.first().getAttribute("value"));
  }

  async addToCart() {
    await this.addToCartButton.first().click();
  }

  async getPrdInfoList(): Promise<Product> {
    return {name:await this.storeProductName(),price: await this.storeProductPrice(),amount: await this.storeProductAmount()};
  }

  async clickReview() {
    await this.reviewButton.first().click();
  }

  async submitReview(star: string, comment: string) {
    await this.page.locator(`a.star-${star}`).click();
    await this.reviewTextBox.fill(comment);
    await this.submitReviewButton.click();
  }

  async verifyReview(star: string, comment: string) {
    await this.reviewButton.click();
    await expect(this.page.locator(".description p").filter({ hasText: `${comment}` })).toBeVisible();
    console.log(comment);
    await expect(
      this.page
        .locator(".comment-text")
        .filter({ hasText: `${comment}` })
        .locator("strong.rating"),
    ).toHaveText(star);
  }
}


