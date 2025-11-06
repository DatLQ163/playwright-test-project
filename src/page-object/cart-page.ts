import { expect, Page } from "@playwright/test";

export class CartPage {
  private readonly cartItemName = this.page.locator(".product-title");
  private readonly cartItemPrice = this.page.locator(
    ".mobile-price .woocommerce-Price-amount"
  );
  private readonly cartItemAmount = this.page.getByRole("spinbutton");
  private readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed to checkout",
  });
  private readonly cartIconButton = this.page
    .getByRole("link")
    .filter({ hasText: "$" });

  constructor(private page: Page) {}

  async verifyCartItemDetail(name: string, price: string, amount: any) {
    await expect(this.cartItemName).toBeVisible();
    const label = await this.cartItemName.textContent();
    const number = await this.cartItemAmount.getAttribute("value");

    expect(label?.toLowerCase()).toBe(name.toLowerCase());
    await expect(this.cartItemPrice).toHaveText(price);
    expect(number).toBe(amount);
  }

  async checkOut() {
    await this.checkoutButton.click();
  }

  async verifyListItems(products: any[][]) {
    for (let i = 0; i < products.length; i++) {
      const actualItemListInfo = [];
      const item = this.page.locator(".cart_item").nth(i);

      const itemName = await item.locator(".product-title").innerText();
      actualItemListInfo.push(itemName);

      const itemPrice = await item
        .locator(".product-price .woocommerce-Price-amount")
        .innerText();
      actualItemListInfo.push(itemPrice);

      const itemQuantity = await item.locator(".qty").getAttribute("value");
      actualItemListInfo.push(itemQuantity);

      expect(actualItemListInfo).toEqual(products[i]);
    }
  }

  async handleToClickCartIcon() {
    if (!(await this.checkoutButton.isVisible())) {
      await this.cartIconButton.click();
    }
  }
}
