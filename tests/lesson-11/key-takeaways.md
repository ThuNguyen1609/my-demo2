# Tổng hợp kiến thức: Lesson 11 - API Testing

## 1. API là gì?
- **Khái niệm:** API (Application Programming Interface - Giao diện lập trình ứng dụng) là bộ quy tắc đóng vai trò như "cầu nối" hoặc "hợp đồng" giúp các phần mềm/hệ thống giao tiếp và làm việc với nhau mà không cần biết chi tiết logic bên trong của nhau.
- **Ví dụ thực tế:** 
  - Ứng dụng thời tiết trên điện thoại gọi API để lấy dữ liệu từ server.
  - Website thanh toán gọi API của ngân hàng để xử lý các giao dịch.
  - Ứng dụng đặt xe sử dụng API của Google Maps để hiển thị bản đồ.

## 2. Tại sao cần test API?
- **Đảm bảo hoạt động đúng:** Đảm bảo API trả về dữ liệu chính xác và xử lý logic đúng như thiết kế ban đầu.
- **Phát hiện lỗi sớm:** Giúp bắt bug ngay từ tầng backend trước khi chúng gây ảnh hưởng lên frontend hoặc người dùng cuối.
- **Kiểm tra bảo mật:** Đảm bảo hệ thống API không bị truy cập trái phép và không làm lộ dữ liệu nhạy cảm.
- **Kiểm tra hiệu năng:** Đánh giá khả năng phản hồi của API có đủ nhanh và chịu tải được lượng lớn request cùng lúc hay không.
- **Tránh phụ thuộc:** Frontend/Mobile và Backend có thể được test độc lập; tester không cần phải đợi giao diện hoàn thiện mới có thể bắt đầu test.
- **Dễ bảo trì:** Mỗi khi có thay đổi code, có thể chạy lại các API test script để đảm bảo không làm hỏng tính năng cũ (Regression testing).

## 3. Các thành phần chính của API
- **Endpoint (URL):** Địa chỉ web dùng để truy cập vào tài nguyên.
- **HTTP Method (Phương thức):** Thao tác cần thực hiện:
  - `GET`: Lấy dữ liệu.
  - `POST`: Tạo mới dữ liệu.
  - `PUT` / `PATCH`: Cập nhật dữ liệu.
  - `DELETE`: Xóa dữ liệu.
- **Request (Yêu cầu gửi đi):**
  - **Headers:** Thông tin bổ sung (token xác thực, content-type...).
  - **Parameters:** Tham số truyền trên URL (query params).
  - **Body:** Dữ liệu cần gửi lên server (định dạng thường là JSON, XML...).
- **Response (Phản hồi trả về):**
  - **Status Code:** Mã trạng thái kết quả (VD: `200 OK`, `404 Not Found`, `500 Server Error`...).
  - **Headers:** Thông tin về phản hồi từ server.
  - **Body:** Dữ liệu thực tế trả về (thường là JSON).
- **API Documentation:** Tài liệu hướng dẫn sử dụng API (thường bao gồm Endpoint, Method, mô tả Body, Params...). Công cụ phổ biến hay dùng để viết document là Swagger.

## 4. Định dạng dữ liệu: JSON (JavaScript Object Notation)
- **Đặc điểm:** Là định dạng phổ biến nhất để trao đổi thông tin giữa client và server. Đặc tính nhẹ, truyền tải nhanh, dễ đọc/viết với con người và máy, hỗ trợ hầu hết các ngôn ngữ lập trình.
- **Cấu trúc cơ bản:** 
  - Là tập hợp các cặp `key`-`value` được đặt trong cặp dấu ngoặc nhọn `{}` (Object).
  - **Key:** Luôn là kiểu chuỗi (string), đặt trong dấu ngoặc kép `" "` và không được trùng lặp.
  - **Value:** Có thể là String (`"text"`), Number (`123`, `3.14`), Boolean (`true`, `false`), Null (`null`), Object (`{}`), hoặc Array (`[]`).
  - *Lưu ý:* Phần tử cuối cùng trong một Object không được có dấu phẩy `,`.

## 5. Các cách gọi (request) API
Gửi một request tới API với các thông tin cần thiết để lấy về kết quả.
- **Qua Command line:** Dùng `cURL`.
- **Qua công cụ có giao diện (GUI):** Dùng Postman.
- **Qua Automation tool:** Dùng Playwright, RestAssured, JMeter.

### 5.1 Khái quát về giao diện Postman
- **Sidebar (Bên trái):** Chứa Collections (nhóm các API), Environments (biến môi trường), History, Mock Servers,...
- **Main Workspace (Giữa):** Khu vực làm việc chính để thiết lập URL, Params, Headers, Body, chạy test và xem kết quả Response.
- **Right Sidebar (Bên phải):** Xem Documentation, Comments, Code snippets.

### 5.2 API Testing với Playwright
Sử dụng `request` fixture để thực hiện gọi API trực tiếp trong code test mà không cần thao tác qua trình duyệt.
- **Cú pháp cơ bản:**
```typescript
import { test, expect } from '@playwright/test';

test('API test cơ bản', async ({ request }) => {
    const url = 'https://material.playwrightvn.com/api/todo-app/v1/todos.php';
    
    // Gọi API bằng phương thức GET
    const response = await request.get(url);
    
    // Lấy dữ liệu trả về:
    const responseText = await response.text(); // Lấy dưới dạng string
    const responseJSON = await response.json(); // Lấy dưới dạng object (được dùng nhiều để verify)
    
    // Kiểm tra kết quả (Assertions)
    expect(response.status()).toBe(200); // Kiểm tra status code
    expect(responseJSON.todos.length).toBe(7); // Kiểm tra số lượng item trả về
});
```

## 6. Luồng Authentication (Xác thực)
Với các luồng API yêu cầu đăng nhập, thường sẽ gồm 2 bước:
1. **Đăng nhập:** Gọi API `/login` với thông tin `username`, `password` -> API sẽ xác thực và trả về một chuỗi `token`.
2. **Sử dụng API:** Khi gọi các API tiếp theo (VD: update thông tin), cần phải đính kèm `token` (lấy được ở bước 1) vào **header** của request. Nếu không truyền header chứa token này, hệ thống sẽ báo lỗi (Thường là lỗi 401 Unauthorized).

**Ví dụ trong Playwright:** Truyền token vào header để thực hiện thao tác xóa user.
```typescript
await test.step('Xoá user', async () => {
    const response = await request.delete('https://material.playwrightvn.com/api/user-management/v1/users.php', {
        headers: {
            'Authorization': `Bearer ${adminToken}`
        },
        data: {
             'id': userID
        }
    });

    const statusCode = response.status();
    expect(statusCode).toBe(200);
});
```
