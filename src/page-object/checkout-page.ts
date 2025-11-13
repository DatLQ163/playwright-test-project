import { expect, Page } from "@playwright/test";
import { Product } from "type/productInfo-interface";

export class CheckoutPage {
  readonly cartCountDownExpiredMessage = this.page.locator(".cart-countdown-expired-message");
  private readonly orderItemName = this.page.locator(".cart_item .product-name");
  private readonly orderItemPrice = this.page.locator(".cart_item .product-total");
  private readonly orderItemAmount = this.page.locator(".cart_item .product-quantity");
  private readonly firstName = this.page.getByRole("textbox", {
    name: "First name *",
  });
  private readonly lastName = this.page.getByRole("textbox", {
    name: "Last name *",
  });
  private readonly countryBox = this.page.locator("select.country_select");
  private readonly town = this.page.getByRole("textbox", {
    name: "Town / City *",
  });
  private readonly street = this.page.getByRole("textbox", {
    name: "Street address *",
  });
  private readonly phone = this.page.getByRole("textbox", { name: "Phone *" });
  private readonly email = this.page.getByRole("textbox", {
    name: "Email address *",
  });
  private readonly placeOrder = this.page.getByRole("button", {
    name: "Place order",
  });
  private readonly zipCode = this.page.getByRole("textbox", {
    name: /ZIP/,
  });

  constructor(private page: Page) {}

  async verifyCheckOutPageDisplay() {
    await this.cartCountDownExpiredMessage.isVisible();
  }

  async verifyOrderItemDetail(product: Product) {
    expect(this.page.locator(".cart_item .product-name").filter({ hasText: product.name }));
    expect(this.page.locator(".cart_item .product-total").filter({ hasText: product.price }));
    expect(this.page.locator(".cart_item .product-quantity").filter({ hasText: String(product.amount) }));
  }

  async fillBillingDetail(billingInfo: { firstName: string; lastName: string; country: string; street: string; town: string; phone: string; email: string }) {
    await this.firstName.fill(billingInfo.firstName);
    await this.lastName.fill(billingInfo.lastName);
    await this.countryBox.selectOption(billingInfo.country);
    await this.street.fill(billingInfo.street);
    await this.town.fill(billingInfo.town);
    await this.phone.fill(billingInfo.phone);
    await this.email.fill(billingInfo.email);
  }

  async clickOnPlaceOrder() {
    await this.placeOrder.click();
  }

  // async verifyListItems(products: any[][]) {
  //   for (let i = 0; i < products.length; i++) {
  //     const actualItemListInfo = [];
  //     const item = this.page.locator(".cart_item").nth(i);

  //     const itemName = await item.locator(".product-name").innerText();
  //     actualItemListInfo.push(itemName);

  //     const itemPrice = await item.locator(".woocommerce-Price-amount").innerText();
  //     actualItemListInfo.push(itemPrice);

  //     const itemQuantity = await item.locator(".product-quantity").getAttribute("value");
  //     actualItemListInfo.push(itemQuantity);

  //     expect(actualItemListInfo).toEqual(products[i]);
  //   }
  // }

  async choosePaymentMethod(method: string) {
    await this.page.getByText(`${method}`).click();
  }
}
