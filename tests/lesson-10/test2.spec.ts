import { test, expect } from '@playwright/test';
import { ProductPage } from './pom2';


test.describe('Test2 - Bài tập thêm sản phẩm', async () => {
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await productPage.openMaterialPage();
        await productPage.openProductPage();
    })

    test('Thêm sản phẩm và kiểm tra số lượng, tổng tiền', async () => {
        await test.step('Thêm sản phẩm', async () => {
            await productPage.addProduct1();
            await productPage.addProduct1();

            await productPage.addProduct2();
            await productPage.addProduct2();
            await productPage.addProduct2();

            await productPage.addProduct3();
        })

        await test.step('Kiểm tra SL và tổng tiền', async () => {
            await expect(productPage.getResultQtty1()).toHaveText('2');
            await expect(productPage.getResultQtty2()).toHaveText('3');
            await expect(productPage.getResultQtty3()).toHaveText('1');

            await expect(productPage.getReSultTotalAmount()).toHaveText('$110.00');
        })

    })

})