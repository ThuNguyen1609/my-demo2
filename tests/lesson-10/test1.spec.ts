import { test, expect } from '@playwright/test';
import { RegisterPage } from './pom1';

test.describe('Test 1 - Bài tập Đki User', () => {

    //khai báo biến cục bộ có kiểu class RegisterPage gọi từ bên file pom để dùng cho tất cả các test và hàm thuộc testsuite Đăng kí User này
    let registerPage: RegisterPage;

    //hàm hook beforeEach, tất cả các test sẽ chạy vào đây rồi mới đi vào từng test
    test.beforeEach(async ({ page }) => {
        //khởi tạo đối tượng: đưa page vào trong class RegisterPage để class này có quyền điều khiển trình duyệt
        registerPage = new RegisterPage(page);
        //gọi hàm mở trình duyệt bên POM
        await registerPage.openMaterialPage();
        //gọi hàm mở page đki bên POM
        await registerPage.openRegisterPage();
    });

    test('Đăng kí thành công và kiểm tra kết quả', async () => {
        await test.step('Nhập thông tin', async () => {
            //gọi các hàm fill bên POM để thực hiện đăng kí
            await registerPage.fillUserName('Thu');
            await registerPage.fillEmail('thunt1609@gmail.com');
            await registerPage.checkGender();
            await registerPage.selectHobbies();
            await registerPage.selectCountry();
            await registerPage.inputDob('1996-09-16');
            await registerPage.inputBio('Tôi là Tester');


            await registerPage.clickButtonRegister();

        });
        await test.step('Kiểm tra kết quả', async () => {
            await expect(registerPage.getResultUsernameLocator()).toHaveText('Thu');
            await expect(registerPage.getResultEmailLocator()).toHaveText('thunt1609@gmail.com');
            await expect(registerPage.getResultInformationLocator()).toContainText('female');
            await expect(registerPage.getResultInformationLocator()).toContainText('traveling');
            await expect(registerPage.getResultInformationLocator()).toContainText('canada');
            await expect(registerPage.getResultInformationLocator()).toContainText('1996-09-16');
            await expect(registerPage.getResultInformationLocator()).toContainText('Tôi là Tester');

        })
    })

});