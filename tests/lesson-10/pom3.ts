import {MaterialBasePage} from './01-pom';
import {Locator, Page} from '@playwright/test';

export class TodoPage extends MaterialBasePage {
    inputNewtask: Locator;
    addButton: Locator;
    resultTodoX: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;

        this.inputNewtask = page.locator("//input[@id='new-task']");
        this.addButton = page.locator("//button[@id='add-task']");
        this.resultTodoX = page.locator("//span");
    }

    async addTodo(taskName: string){
        await this.inputNewtask.fill(taskName);
        await this.addButton.click();
    }

    async deleteTodo(index: number){
        const XpathDelete = `//button[@id='todo${index}-delete']`;
        await this.page.locator(XpathDelete).click();
    }
    
    getTodoX (index: number): Locator{
        return this.resultTodoX.filter({ hasText: `todo${index}` });
    }
}