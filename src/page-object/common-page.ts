import { Page } from "@playwright/test";
import { OrderPage } from "./order-page";
import { AccountPage } from "./account-page";
import { ProductPage } from "./product-page";
import { ProductInfoPage } from "./productinfo-page";
import { CartPage } from "./cart-page";
import { CheckoutPage } from "./checkout-page";
import { PAGE_NAV } from "dataTest/PageNav";

export class BasePage {
  private readonly cartIconButton = this.page
    .getByRole("link")
    .filter({ hasText: "$" });
  private readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed to checkout",
  });
  private readonly orderPage = new OrderPage(this.page);
  private readonly accountPage = new AccountPage(this.page);
  private readonly productPage = new ProductPage(this.page);
  private readonly productInfoPage = new ProductInfoPage(this.page);
  private readonly cartPage = new CartPage(this.page);
  private readonly checkoutPage = new CheckoutPage(this.page);

  constructor(private page: Page) {}

  // async gotoCartPage(timeout:10000){
  //     await this.cartIconButton.click();
  //     while (!(await this.checkoutButton.isVisible())){
  //         await this.page.reload()
  //     }
  // }
  async gotoCartPage(timeout = 10000) {
    await Promise.race([
      (async () => {
        await this.cartIconButton.click();

        while (!(await this.checkoutButton.isVisible())) {
          await this.page.reload();
          await this.page.waitForTimeout(500);
        }
      })(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`gotoCartPage() timeout sau ${timeout}ms`)),
          timeout
        )
      ),
    ]);
  }

  async orderProduct() {
    await this.accountPage.selectMenuBar(PAGE_NAV.SHOP);
    await this.productPage.chooseProduct("Beats Solo3 Wireless On-Ear");
    await this.productInfoPage.addToCart();
    await this.gotoCartPage();
    await this.cartPage.checkOut();
    await this.checkoutPage.choosePaymentMethod("Direct bank transfer");
    await this.checkoutPage.fillBillingDetail({
      firstName: "Dat",
      lastName: "Le",
      country: "Vietnam",
      street: "Tran Quoc Toan",
      town: "Da Nang",
      phone: "123456789",
      email: "dat.le@agest.vn",
    });
    await this.checkoutPage.clickOnPlaceOrder();

    return this.orderPage.getOrderInfo();
  }
}
