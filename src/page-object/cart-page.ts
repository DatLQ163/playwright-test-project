import { expect, Page } from "@playwright/test";
import { Product } from "type/productInfo-interface";

export class CartPage {
  private readonly cartItemName = this.page.locator(".product-title");
  private readonly cartItemPrice = this.page.locator(".mobile-price .woocommerce-Price-amount");
  private readonly cartItemAmount = this.page.getByRole("spinbutton");
  private readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed to checkout",
  });
  private readonly cartIconButton = this.page.getByRole("link").filter({ hasText: "$" });
  private readonly clearCartButton = this.page.locator(".clear-cart");
  private readonly emptyCartMessage = this.page.locator(".cart-empty");
  private readonly plusButton = this.page.locator(".plus");
  private readonly minusButton = this.page.locator(".minus");
  private readonly quantityTextbox = this.page.locator(".qty");
  private readonly updateCartButton = this.page.locator("button.gray");
  private readonly totalPrice = this.page.locator(".product-subtotal .woocommerce-Price-amount");

  constructor(private page: Page) {}

  async verifyCartItemDetail(product: Product) {
    await expect(this.page.locator("tr").filter({ hasText: product.name })).toBeVisible();
    await expect(this.page.locator("tr").filter({ hasText: product.name }).locator("td.product-price")).toContainText(product.price);
    await expect(this.page.locator("tr").filter({ hasText: product.name }).locator("input")).toHaveAttribute("value", product.amount);
  }

  async verifyProductAmount(name: string,amount: number){
    await expect(this.page.locator("tr").filter({ hasText: name }).locator("input")).toHaveAttribute("value", String(amount));
  }

  async checkOut() {
    await this.checkoutButton.click();
  }

  async verifyListItems2(products: Product[]) {
    for (const product of products) {
      await this.verifyCartItemDetail(product);
    }
  }

  async verifyListItems(products: any[][]) {
    for (let i = 0; i < products.length; i++) {
      const actualItemListInfo = [];
      const item = this.page.locator(".cart_item").nth(i);

      const itemName = await item.locator(".product-title").innerText();
      actualItemListInfo.push(itemName);

      const itemPrice = await item.locator(".product-price .woocommerce-Price-amount").innerText();
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

  async clearShoppingCart() {
    this.page.once('dialog', async dialog => {
        await dialog.accept();
    });
    await this.page.locator('a.clear-cart').click({ force: true });
    // console.log(dialog.message());
  }

  async verifyCartEmpty() {
    await expect(this.emptyCartMessage).toBeVisible({timeout:20000});
  }

  async changeOrderQuantity(option: string) {
    if (option === "plus") {
      await this.plusButton.click();
    } else if (option === "minus") {
      await this.minusButton.click();
    } else {
      await this.quantityTextbox.fill(option);
      await this.page.keyboard.press("Enter");
    }
    // await expect(this.updateCartButton).toHaveAttribute("aria-disabled", "false", { timeout: 10000 });
    // await expect(this.updateCartButton).toHaveAttribute("aria-disabled", "true", { timeout: 10000 });
  }

  async verifyTotalPrice(name:string, price: any, amount: any) {
    const priceNumber = parseFloat(price.replace("$", ""));
    const number = parseFloat(amount);
    const total = (priceNumber * number).toString();
    expect(await expect(this.page.locator("tr").filter({ hasText: name }).locator("td.product-subtotal")).toContainText(total));
    console.log(total);
  }
}
