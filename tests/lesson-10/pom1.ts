import { MaterialBasePage } from './01-pom';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends MaterialBasePage {
    //Khai báo thêm các thuộc tính MỚI của riêng class con này
    xpathUserName: string;
    xpathEmail: Locator;
    xpathGender: Locator;
    xpathHobbies: Locator;
    xpathInterests: Locator;
    xpathCountry: Locator;
    xpathDob: Locator;
    xpathBiography: Locator;

    xpathRegisterButton: Locator;

    xpathResultUsername: Locator;
    xpathResultEmail: Locator;
    xpathResultInformation: Locator;



    //khoi tao cac thuoc tinh moi
    constructor(page: Page) {
        //Gọi super(page) để chạy lại hàm constructor của class cha (MaterialBasePage)
        super(page);

        this.page = page;

        // Khởi tạo các thuộc tính mới của class con
        this.xpathUserName = "//input[@id='username']";
        this.xpathEmail = page.locator("//input[@id='email']");
        this.xpathGender = page.locator("//input[@type='radio' and @id='female']");
        this.xpathHobbies = page.locator("//input[@type='checkbox' and @id='traveling']");
        this.xpathInterests = page.locator("//select[@id='interests']");
        this.xpathCountry = page.locator("//select[@id='country']");
        this.xpathDob = page.locator("//input[@type ='date' and @id='dob']");
        this.xpathBiography = page.locator("//textarea[@id='bio']");

        this.xpathRegisterButton = page.locator("//button[@type='submit']");

        this.xpathResultUsername = page.locator("//*[@id='userTable']/tbody/tr/td[2]");
        this.xpathResultEmail = page.locator("//*[@id='userTable']/tbody/tr/td[3]");
        this.xpathResultInformation = page.locator("//*[@id='userTable']/tbody/tr/td[4]");


    }
    //các hàm điền thông tin
    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }
    async fillEmail(email: string) {
        await this.xpathEmail.fill(email);
    }
    async checkGender() {
        await this.xpathGender.click();
    }
    async selectHobbies() {
        await this.xpathHobbies.click();
    }
    async selectCountry() {
        await this.xpathCountry.selectOption({ label: 'Canada' });
    }
    async inputDob(dob: string) {
        await this.xpathDob.fill(dob);
    }
    async inputBio(bio: string) {
        await this.xpathBiography.fill(bio);
    }

    //hàm click nút đki
    async clickButtonRegister() {
        await this.xpathRegisterButton.click();
    }

    //hàm trả kết quả
    getResultUsernameLocator(): Locator {
        return this.xpathResultUsername;
    }
    getResultEmailLocator(): Locator {
        return this.xpathResultEmail;
    }
    getResultInformationLocator(): Locator {
        return this.xpathResultInformation;
    }
}

