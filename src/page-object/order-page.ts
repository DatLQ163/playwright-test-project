import { expect, Page } from "@playwright/test";
import { Product } from "type/productInfo-interface";
import { CartPage } from "./cart-page";

export class OrderPage {
  private readonly orderStatus = this.page.locator(".woocommerce-notice--success");
  private readonly orderNumber = this.page.locator(".woocommerce-order-overview__order strong");
  private readonly orderDate = this.page.locator(".woocommerce-order-overview__date strong");
  private readonly paymentMethod = this.page.locator(".woocommerce-order-overview__payment-method strong");
  private readonly orderProductName = this.page.locator(".order_item .woocommerce-table__product-name");
  private readonly orderProductAmount = this.page.locator(".order_item .product-quantity");
  private readonly orderProductPrice = this.page.locator(".order_item .woocommerce-Price-amount");
  private readonly billingDetail = this.page.locator(".woocommerce-customer-details");
  private readonly orderConfirmationMessage = this.page.locator(".woocommerce-thankyou-order-received");
  private readonly emailErrorMessage = this.page.locator("#billing_email");

  private readonly cartPage = new CartPage(this.page);

  constructor(private page: Page) {}

  async verifyOrderPageDisplay() {
    await this.orderStatus.isVisible();
  }

  async verifyOrderDetail(product: Product) {
    expect((await this.orderProductName.innerText()).toLowerCase()).toContain(product.name.toLowerCase());
    expect(this.orderProductAmount).toContainText(product.amount);
    expect(this.orderProductPrice).toContainText(product.price);
  }

  async verifyBillingDetail(billingInfo: { firstName: string; lastName: string; country: string; street: string; town: string; phone: string; email: string }) {
    expect(this.billingDetail).toContainText(billingInfo.firstName);
    expect(this.billingDetail).toContainText(billingInfo.lastName);
    expect(this.billingDetail).toContainText(billingInfo.country);
    expect(this.billingDetail).toContainText(billingInfo.street);
    expect(this.billingDetail).toContainText(billingInfo.town);
    expect(this.billingDetail).toContainText(billingInfo.email);
    expect(this.billingDetail).toContainText(billingInfo.phone);
  }

  async verifyListItems2(products: Product[]) {
    for (const product of products) {
      await this.cartPage.verifyCartItemDetail(product)
    }
  }

  async verifyListItems(products: any[][]) {
    for (let i = 0; i < products.length; i++) {
      const actualItemListInfo = [];
      const item = this.page.locator(".order_item").nth(i);

      const itemName = await item.locator(".product-name").innerText();
      actualItemListInfo.push(itemName);

      const itemPrice = await item.locator(".woocommerce-Price-amount").innerText();
      actualItemListInfo.push(itemPrice);

      const itemQuantity = await item.locator(".product-quantity").getAttribute("value");
      actualItemListInfo.push(itemQuantity);

      expect(actualItemListInfo).toEqual(products[i]);
    }
  }

  async verifyOrderConfirmationMessage() {
    await expect(this.orderConfirmationMessage).toBeVisible();
  }

  async getOrderInfo() {
    const orderInfo = new Map<string, string>();
    orderInfo.set("number", await this.orderNumber.innerText());
    orderInfo.set("date", await this.orderDate.innerText());
    orderInfo.set("method", await this.paymentMethod.innerText());
    orderInfo.set("name", await this.orderProductName.innerText());
    orderInfo.set("amount", await this.orderProductAmount.innerText());
    orderInfo.set("price", await this.orderProductPrice.innerText());

    console.log(orderInfo.get("number"));
    return orderInfo;
  }

  async verifyEmailErrorMessage() {
    await expect(this.emailErrorMessage).toBeVisible();
  }
}
