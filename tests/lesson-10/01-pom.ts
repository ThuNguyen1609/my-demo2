import { Page, Locator } from '@playwright/test';

//khái báo class MaterialBasePage: nôm na là 1 đối tượng chứa các thuộc tính và các action
export class MaterialBasePage {
    page: Page;
    //Khai báo các thuộc tính và kiểu dữ liệu của thuộc tính
    xpathRegisterPage: string;
    xpathProductPage: string;
    xpathTodoPage: string;
    xpathPersonalPage: string;
    cssTodoPage: string;
    personalNote: string;

    //khởi tạo các thuộc tính (bắt buộc phải truyền page để class điều khiển được trình duyệt)
    constructor(page: Page) {
        this.page = page;
        this.xpathRegisterPage = "//a[@href='01-xpath-register-page.html']";
        this.xpathProductPage = "//a[@href='02-xpath-product-page.html']";
        this.xpathTodoPage = "//a[@href='03-xpath-todo-list.html']";
        this.xpathPersonalPage = "//a[@href='04-xpath-personal-notes.html']";
        this.personalNote = "";
        this.cssTodoPage = "";

    }
    //khai báo phương thức (action thực hiện)
    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }
    async openRegisterPage() {
        await this.page.locator(this.xpathRegisterPage).click();
        await this.page.waitForURL('**/01-xpath-register-page.html');
    }
    async openProductPage() {
        await this.page.locator(this.xpathProductPage).click();
        await this.page.waitForURL('**/02-xpath-product-page.html');

    }
    async openTodoPage() {
        await this.page.locator(this.xpathTodoPage).click();
        await this.page.waitForURL('**/03-xpath-todo-list.html');
    }

    async openPersonalPage() {
        await this.page.locator(this.xpathPersonalPage).click();
        await this.page.waitForURL('**/04-xpath-personal-notes.html');
    }

}


