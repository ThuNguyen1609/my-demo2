import { test, expect } from 'playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
});
test.describe('AUTTH - Authentication', () => {
    test('@AUTH_001 - Login fail', async ({ page }) => {
        //nhập thông tin
        await page.locator("//input[@id='user_login']").fill('thu');
        await page.locator("//input[@id='user_pass']").fill('thu');

        //click login
        await page.locator("//input[@id='wp-submit']").click();

        //kiểm tra hiển thị lỗi
        const loginFail = await page.locator("//div[@id='login_error']");
        await expect(loginFail).toHaveText("Error: The username thu is not registered on this site. If you are unsure of your username, try your email address instead.", { timeout: 10_00 });

    });
    test('@AUTH_002 - Login success', async ({ page }) => {
        //nhập thông tin
        await page.locator("//input[@id='user_login']").fill('betterbytes.academy.admin');
        await page.locator("//input[@id='user_pass']").fill(' StrongPass@BetterBytesAcademy');

        //click login
        await page.locator("//input[@id='wp-submit']").click();

        //kiểm tra page có tile
        await expect(page).toHaveURL('https://pw-practice-dev.playwrightvn.com/wp-admin/');

        //kiểm tra heading h1 hiển thị Dashboard
        await expect(page.locator('//h1')).toHaveText('Dashboard');

        //Kiểm tra thẻ h2 có text là "At a Glance"
        await expect(page.locator("//h2[text()='At a Glance']")).toBeVisible();

        //Kiểm tra thẻ h2 có text là "Activity"
        await expect(page.locator("//h2[text()='Activity']")).toBeVisible();

    });
});

