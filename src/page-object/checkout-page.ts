import { expect, Page } from "@playwright/test";

export class CheckoutPage {
  readonly cartCountDownExpiredMessage = this.page.locator(
    ".cart-countdown-expired-message"
  );
  private readonly orderItemName = this.page.locator(
    ".cart_item .product-name"
  );
  private readonly orderItemPrice = this.page.locator(
    ".cart_item .product-total"
  );
  private readonly orderItemAmount = this.page.locator(
    ".cart_item .product-quantity"
  );
  private readonly firstName = this.page.getByRole("textbox", {
    name: "First name *",
  });
  private readonly lastName = this.page.getByRole("textbox", {
    name: "Last name *",
  });
  private readonly countryBox = this.page.getByRole("combobox", {
    name: "Country / Region",
  });
  private readonly country = this.page.getByRole("option", { name: "Vietnam" });
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

  async verifyOrderItemDetail(name: string, price: string, amount: any) {
    const label = await this.orderItemName.innerText();
    const cost = await this.orderItemPrice.innerText();
    const number = await this.orderItemAmount.innerText();

    expect(label.toLowerCase()).toContain(name.toLowerCase());
    expect(cost).toContain(price);
    expect(number).toContain(amount);
  }

  async fillBillingDetail(billingInfo: {
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    town: string;
    phone: string;
    email: string;
  }) {
    await this.firstName.fill(billingInfo.firstName);
    await this.lastName.fill(billingInfo.lastName);
    await this.countryBox.click();
    await this.page
      .getByRole("option", { name: `${billingInfo.country}` })
      .click();
    await this.street.fill(billingInfo.street);
    await this.town.fill(billingInfo.town);
    await this.phone.fill(billingInfo.phone);
    await this.email.fill(billingInfo.email);
  }

  async clickOnPlaceOrder() {
    await this.placeOrder.click();
  }

  async verifyListItems(products: any[][]) {
    for (let i = 0; i < products.length; i++) {
      const actualItemListInfo = [];
      const item = this.page.locator(".cart_item").nth(i);

      const itemName = await item.locator(".product-name").innerText();
      actualItemListInfo.push(itemName);

      const itemPrice = await item
        .locator(".woocommerce-Price-amount")
        .innerText();
      actualItemListInfo.push(itemPrice);

      const itemQuantity = await item
        .locator(".product-quantity")
        .getAttribute("value");
      actualItemListInfo.push(itemQuantity);

      expect(actualItemListInfo).toEqual(products[i]);
    }
  }

  async choosePaymentMethod(method: string) {
    await this.page.getByText(`${method}`).click();
  }
}
