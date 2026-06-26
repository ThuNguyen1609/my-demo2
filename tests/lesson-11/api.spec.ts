import { test, expect } from '@playwright/test';

test.describe('Login and create user', async () => {
    test('Login success', async ({ request }) => {
        await test.step('Login with admin account', async () => {
            const response = await request.post('https://material.playwrightvn.com/api/user-management/v1/login.php', {
                data: {
                    "email": "admin@example.com",
                    "password": "password"
                },
            });

            const statusCode = response.status();
            expect(statusCode).toBe(200);

            const responseJSON = await response.json();
            expect(responseJSON.data).toHaveProperty('token');

            console.log(statusCode);
            console.log(responseJSON.data.token);
        })

        await test.step('Login with user account', async () => {
            const response = await request.post('https://material.playwrightvn.com/api/user-management/v1/login.php', {
                data: {
                    "email": "john@example.com",
                    "password": "password"
                },
            });

            const statusCode = response.status();
            expect(statusCode).toBe(200);

            const responseJSON = await response.json();
            expect(responseJSON.data).toHaveProperty('token');

            console.log(statusCode);
            console.log(responseJSON.data.token);
        })
    })

    test('Create user success', async ({ request }) => {
        let adminToken = '';
        let userID = 0;

        await test.step('Login admin account', async () => {
            const response = await request.post('https://material.playwrightvn.com/api/user-management/v1/login.php', {
                data: {
                    "email": "admin@example.com",
                    "password": "password"
                },
            });

            const statusCode = response.status();
            expect(statusCode).toBe(200);

            const responseJSON = await response.json();
            adminToken = responseJSON.data.token;
        })

        await test.step('Create user', async () => {
            const response = await request.post('https://material.playwrightvn.com/api/user-management/v1/users.php', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                },
                data: {
                    "name": "K23_Thu2",
                    "email": "K23_Thu2@gmail.com",
                    "password": "1234",
                    "facebook": "https://facebook.com/newuser",
                    "avatar": "https://i.pravatar.cc/150?img=20",
                    "hobbies": "Reading, Coding",
                    "role": "user"
                }
            });

            const statusCode = response.status();
            expect(statusCode).toBe(201);

            const responseJSON = await response.json();
            //in ra full thông tin user vừa tạo
            console.log(responseJSON);

            //gán lại userID của user vừa tạo để truyền xuống API xoá
            userID = responseJSON['user']['id'];
            console.log('ID vừa tạo là:',userID);
        })


        await test.step('Lấy danh sách user', async () => {
            const response = await request.get('https://material.playwrightvn.com/api/user-management/v1/users.php', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            })

            const statusCode = response.status();
            expect(statusCode).toBe(200);

            const responseJSON = await response.json();
            const listName = [];
            const userArray = responseJSON['users'];
            for (let i = 0; i < userArray.length; i++) {
                listName.push(userArray[i]['name']);
            }
            //in ra full list user
            console.log(responseJSON);

            //assert có tồn tại username vừa tạo
            expect(listName).toContain('K23_Thu2');
        })

        await test.step('Xoá user', async () => {
            const response = await request.delete('https://material.playwrightvn.com/api/user-management/v1/users.php', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                },
                data: {
                     'id': userID
                }
            })

            const statusCode = response.status();
            expect(statusCode).toBe(200);
        })

        await test.step('Kiểm tra user đã bị xoá khỏi danh sách', async () => {
            const response = await request.get('https://material.playwrightvn.com/api/user-management/v1/users.php', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            })

            const statusCode = response.status();
            expect(statusCode).toBe(200);

            const responseJSON = await response.json();
            const listName = [];
            const userArray = responseJSON['users'];
            for (let i = 0; i < userArray.length; i++) {
                listName.push(userArray[i]['name']);
            }
            console.log(responseJSON);
            console.log(listName);
            expect(listName).not.toContain('K23_Thu2');
        })
    })
});
