import {MaterialBasePage} from './01-pom';
import {Locator, Page} from '@playwright/test';

export class ProductPage extends MaterialBasePage {
    qty1: Locator;
    qty2: Locator;
    qty3: Locator;
    totalAmount: Locator;

    constructor(page: Page) {
        // BẮT BUỘC: Gọi super(page) để chạy lại hàm constructor của class cha (MaterialBasePage)
        super(page);

        this.page = page;

        this.qty1 = page.locator("//*[@id='cart-items']/tr[1]/td[3]");
        this.qty2 = page.locator("//*[@id='cart-items']/tr[2]/td[3]");
        this.qty3 = page.locator("//*[@id='cart-items']/tr[3]/td[3]");

        this.totalAmount = page.locator("//td[@class='total-price']");

    }

    async addToCart(productId: number, quantity: number){
        const productButton = this.page.locator(`//button[@data-product-id='${productId}']`);
        for(let i = 0; i < quantity; i++){
            await productButton.click();
        }
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

