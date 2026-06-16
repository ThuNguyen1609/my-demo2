import { test, expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
  await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
  await page.locator("//input[@id='user_pass']").fill(" StrongPass@BetterBytesAcademy");
  await page.locator("//input[@id='wp-submit']").click();
});

test.describe("ACCOUNT - Account", () => {
  test("@ACC_001 - Create account with editor permission", async ({ page }) => {

    await test.step('ACC_001_01', async () => {
      //Click menu Users
      await page.locator("//li[@id='menu-users']//div[@class='wp-menu-name']").click();

      //Kiểm tra Heading Users visible
      await expect(page.locator("//h1[contains(text(),'Users')]")).toBeVisible();

      //Kiểm tra button Add User enable
      await expect(page.locator("//div[@role='main']//a[contains(text(),'Add User')]")).toBeEnabled();
    });

    await test.step('ACC_001_02', async () => {
      //Click button Add User
      await page.locator("//div[@role='main']//a[contains(text(),'Add User')]").click();

      //Fill các thông tin user
      await page.locator("//input[@id='user_login']").fill('K23_Thu');
      await page.locator("//input[@id='email']").fill('thunt1609@gmail.com');
      await page.locator("//input[@id='first_name']").fill('K23');
      await page.locator("//input[@id='last_name']").fill('Thu');
      await page.locator("//select[@id='role']").selectOption({ label: 'Editor' }); //nhớ làm ham selectOption luôn lấy locator từ thẻ cha select

      //xoá pw tự gen và đặt lại
      await page.locator("//input[@id='pass1']").clear();
      await page.locator("//input[@id='pass1']").fill('Thu2205@2025');


      //Click button Add user
      await page.locator("//input[@id='createusersub']").click();

      //Kiểm tra hiển thị thông báo tạo user thành công
      await expect(page.locator("//div[@id='message']/p[contains(text(), 'New user created')]")).toBeVisible();

    });

    await test.step('ACC_001_03', async () => {
      //Logout user admin
      await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
      await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

      //Login lại với user vừa tạo
      await page.locator("//input[@id='user_login']").fill("K23_Thu");
      await page.locator("//input[@id='user_pass']").fill("Thu2205@2025");
      await page.locator("//input[@id='wp-submit']").click();

      //Kiểm tra hiển thị các menu
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Dashboard')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Posts')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Media')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Pages')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Comments')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Profile')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Tools')]")).toBeVisible();

      //Kiểm tra ko hiển thị các menu
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Appearance')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Uses')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Plugins')]")).toBeHidden();

    });

    await test.step('ACC_001_04', async () => {
      //Logout user editor
      await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
      await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

      //Login user admin
      await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
      await page.locator("//input[@id='user_pass']").fill(" StrongPass@BetterBytesAcademy");
      await page.locator("//input[@id='wp-submit']").click();

      //Click menu Users
      await page.locator("//li[@id='menu-users']").click();

      //Tìm kiếm user vừa tạo
      await page.locator("//input[@id='user-search-input']").fill("K23_Thu");
      await page.locator("//input[@id='search-submit']").click();

      //hover để xoá
      await page.locator("//td[@data-colname='Username']").hover();
      await page.locator("//span[@class='delete']").click();

      //Chọn content?
      await page.locator("//label[@for='delete_option0']").check();

      //Click xoá
      await page.locator("//input[@value='Confirm Deletion']").click();

      //Kiểm tra user đã bị xoá
      await page.locator("//input[@id='user-search-input']").fill("K23_Thu");
      await page.locator("//input[@id='search-submit']").click();
      await expect(page.locator("//td[contains((text),'No users found.']")).toBeVisible;

    });
  });

  test("@ACC_002 - Create account with subscriber permission", async ({ page }) => {

    await test.step('ACC_002_02', async () => {
      //Click menu Users
      await page.locator("//li[@id='menu-users']//div[@class='wp-menu-name']").click();

      //Kiểm tra Heading Users visible
      await expect(page.locator("//h1[contains(text(),'Users')]")).toBeVisible();

      //Kiểm tra button Add User enable
      await expect(page.locator("//div[@role='main']//a[contains(text(),'Add User')]")).toBeEnabled();
    });

    await test.step('ACC_002_02', async () => {
      //Click button Add User
      await page.locator("//div[@role='main']//a[contains(text(),'Add User')]").click();

      //Fill các thông tin user
      await page.locator("//input[@id='user_login']").fill('K23_Thu');
      await page.locator("//input[@id='email']").fill('thunt1609@gmail.com');
      await page.locator("//input[@id='first_name']").fill('K23');
      await page.locator("//input[@id='last_name']").fill('Thu');
      await page.locator("//select[@id='role']").selectOption({ label: 'Subscriber' }); //nhớ làm ham selectOption luôn lấy locator từ thẻ cha select

      //xoá pw tự gen và đặt lại
      await page.locator("//input[@id='pass1']").clear();
      await page.locator("//input[@id='pass1']").fill('Thu2205@2025');


      //Click button Add user
      await page.locator("//input[@id='createusersub']").click();

      //Kiểm tra hiển thị thông báo tạo user thành công
      await expect(page.locator("//div[@id='message']/p[contains(text(), 'New user created')]")).toBeVisible();

    });

    await test.step('ACC_002_03', async () => {
      //Logout user admin
      await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
      await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

      //Login lại với user vừa tạo
      await page.locator("//input[@id='user_login']").fill("K23_Thu");
      await page.locator("//input[@id='user_pass']").fill("Thu2205@2025");
      await page.locator("//input[@id='wp-submit']").click();

      //Kiểm tra hiển thị các menu
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Dashboard')]")).toBeVisible();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Profile')]")).toBeVisible();

      //Kiểm tra ko hiển thị các menu
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Appearance')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Uses')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Plugins')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Posts')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Media')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Pages')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Comments')]")).toBeHidden();
      await expect(page.locator("//ul[@id='adminmenu']/li/a/div[2][contains(text(), 'Tools')]")).toBeHidden();

    });

    await test.step('ACC_002_04', async () => {
      //Logout user subscriber
      await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
      await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

      //Login user admin
      await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
      await page.locator("//input[@id='user_pass']").fill(" StrongPass@BetterBytesAcademy");
      await page.locator("//input[@id='wp-submit']").click();

      //Click menu Users
      await page.locator("//li[@id='menu-users']").click();

      //Tìm kiếm user vừa tạo
      await page.locator("//input[@id='user-search-input']").fill("K23_Thu");
      await page.locator("//input[@id='search-submit']").click();

      //hover để xoá
      await page.locator("//td[@data-colname='Username']").hover();
      await page.locator("//span[@class='delete']").click();

      //Click xoá
      await page.locator("//input[@value='Confirm Deletion']").click();

      //Kiểm tra user đã bị xoá
      await page.locator("//input[@id='user-search-input']").fill("K23_Thu");
      await page.locator("//input[@id='search-submit']").click();
      await expect(page.locator("//td[contains((text),'No users found.']")).toBeVisible;

    });
  });

});
