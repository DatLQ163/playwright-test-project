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
  private readonly clearCartButton = this.page.locator(".clear-cart");
  private readonly emptyCartMessage = this.page.locator(".cart-empty");
  private readonly plusButton = this.page.locator(".plus");
  private readonly minusButton = this.page.locator(".minus");
  private readonly quantityTextbox = this.page.locator(".qty");
  private readonly updateCartButton = this.page.locator('button.gray');
  private readonly totalPrice = this.page.locator('.product-subtotal .woocommerce-Price-amount');
  

  constructor(private page: Page) {}

  async verifyCartItemDetail(name: string, price: string, amount: any) {
    await expect(this.checkoutButton).toBeVisible();
    const label = await this.cartItemName.textContent();
    const cartPrice = await this.cartItemPrice.textContent();
    const number = Number(await this.cartItemAmount.getAttribute("value"));

    expect(label?.toLowerCase()).toBe(name.toLowerCase());
    expect(price).toContain(cartPrice);
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

  async clearShoppingCart() {
    await expect(this.clearCartButton).toBeVisible();
    const dialogPromise = this.page.waitForEvent("dialog");
    this.clearCartButton.click();
    const dialog = await dialogPromise;
    console.log(dialog.message()); // In ra nội dung popup, ví dụ: "Are you sure?"
    await dialog.accept(); // Nhấn OK
  }

  async verifyCartEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async changeOrderQuantity(option: string){
    if(option==='plus'){
      await this.plusButton.click();
    }else if(option==='minus'){
      await this.minusButton.click();
    }else{
      await this.quantityTextbox.fill(option)
      await this.page.keyboard.press('Enter')
    }
    await expect(this.updateCartButton).toHaveAttribute('aria-disabled','false',{timeout:10000});
    await expect(this.updateCartButton).toHaveAttribute('aria-disabled','true',{timeout:10000});
  }

  async verifyTotalPrice(price: any, amount: any){
    const priceNumber = parseFloat(price.replace('$', ''));
    const number = parseFloat(amount);
    const total = (priceNumber*number).toString();
    expect(await this.totalPrice.innerText()).toContain(total);
    console.log(total)
  }
}


