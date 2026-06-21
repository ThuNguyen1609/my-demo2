import {MaterialBasePage} from './01-pom';
import {Locator, Page} from '@playwright/test';

export class ProductPage extends MaterialBasePage {
    product1: Locator;
    product2: Locator;
    product3: Locator;
    qty1: Locator;
    qty2: Locator;
    qty3: Locator;
    totalAmount: Locator;

    constructor(page: Page) {
        // BẮT BUỘC: Gọi super(page) để chạy lại hàm constructor của class cha (MaterialBasePage)
        super(page);

        this.page = page;

        this.product1 = page.locator("//button[@data-product-id='1']");
        this.product2 = page.locator("//button[@data-product-id='2']");
        this.product3 = page.locator("//button[@data-product-id='3']");

        this.qty1 = page.locator("//*[@id='cart-items']/tr[1]/td[3]");
        this.qty2 = page.locator("//*[@id='cart-items']/tr[2]/td[3]");
        this.qty3 = page.locator("//*[@id='cart-items']/tr[3]/td[3]");

        this.totalAmount = page.locator("//td[@class='total-price']");

    }

    async addProduct1() {
        await this.product1.click();
    }
    async addProduct2() {
        await this.product2.click();
    }
    async addProduct3() {
        await this.product3.click();
    }

    getResultQtty1(): Locator {
        return this.qty1;
    }
    getResultQtty2(): Locator {
        return this.qty2;
    }
    getResultQtty3(): Locator {
        return this.qty3;
    }

    getReSultTotalAmount(): Locator {
        return this.totalAmount;
    }
}

