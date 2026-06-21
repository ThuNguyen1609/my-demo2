import { test, expect } from '@playwright/test';
import { TodoPage } from './pom3';

test.describe('Test 3 - Bài tập todopage', async () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.openMaterialPage();
        await todoPage.openTodoPage();
    })

    test('Thêm - xoá - kiểm tra thứ tự todo', async ({ page }) => {
        await test.step('Thêm mới 100 todo item', async () => {
            for (let i = 1; i <= 100; i++) {
                await todoPage.addTodo(`todo${i}`);
            }
        });

        await test.step('Xoá các todo có số lẻ', async () => {
            page.on('dialog', async dialog => await dialog.accept());

            for (let i = 1; i <= 100; i += 2) {
                await todoPage.deleteTodo(i);
            }
        });

        await test.step('Kiểm tra todo 90 & 21 có trong viewpoint không', async () => {
            await expect(todoPage.getTodoX(90)).toBeVisible();
            await expect(todoPage.getTodoX(21)).toBeHidden();

        });
    });
 });
