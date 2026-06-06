/*
Tạo file test1.spec.ts. Truy cập trang https://material.playwrightvn.com/, click vào “Bài
học 1: Register Page (có đủ các element)”
a. Nhập thông tin cho các field: Username, Email, Gender, Hobbies,
Interests, Country, Date of Birth, Profile Picture, Biography
b. Click button Register
*/
import { test } from 'playwright/test';
test('test1', async ({ page }) => {
    await test.step('Di toi trang chu material', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click bai hoc 1', async () => {
        await page.locator("//a[@href='01-xpath-register-page.html']").click();
    });

    await test.step('Dien thong tin', async () => {
        await page.locator("//input[@id='username']").fill("Nguyen Thi Thu");

        await page.locator("//input[@id='email']").pressSequentially("thu@gmail.com");

        await page.locator("//input[@type='radio' and @id='female']").check();

        await page.locator("//input[@type='checkbox' and @id='traveling']").check();

        //selectOption phai di tu the cha select chu ko di tu the option
        await page.locator("//select[@id='interests']").selectOption({ label: 'Technology' });

        await page.locator("//select[@id='country']").selectOption({ label: 'Canada' });

        await page.locator("//input[@type ='date' and @id='dob']").fill("1996-09-16");

        await page.locator("//input[@type='file']").setInputFiles("data/a.txt");

        await page.locator("//textarea[@id='bio']").fill("Toi la Tester");
    });


    await test.step('Click button Register', async () => {
        await page.locator("//button[@type='submit']").click();
    });

});