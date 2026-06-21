# Tổng hợp kiến thức Lesson 10: TypeScript & Page Object Model (POM)

## 1. TypeScript và JavaScript
- **TypeScript (TS)** là một superset (phiên bản mở rộng) của JavaScript (JS).
- **Lý do sử dụng TS**: JS "dễ dãi" dẫn đến dễ sinh lỗi. TS "khó tính" hơn với hệ thống kiểu dữ liệu chặt chẽ, giúp phát hiện lỗi từ sớm và giảm bớt lỗi khi code.
- Hỗ trợ tốt các tính năng: Interface, Type alias, OOP, Generic.
- **Biên dịch và thực thi**: Code TS cần được biên dịch sang JS trước khi chạy.
  - Cài đặt: `npm install -d typescript`
  - Biên dịch: `npx tsc <file_path>` (tạo ra file JS tương ứng).
  - Chạy file: `node <file_path>`

## 2. Định nghĩa kiểu dữ liệu (Define Type)
Định nghĩa kiểu dữ liệu giúp code rõ ràng, dễ đọc. Có thể dùng:
- **`type`**: Định nghĩa một tập hợp kiểu dữ liệu. Cú pháp có dấu `=`. (VD: `type User = { name: string; age: number; }`)
- **`interface`**: Tương tự `type` nhưng cú pháp không có dấu `=`. (VD: `interface User { name: string; age: number; }`)

## 3. Class và Kế thừa (Extends) trong TypeScript
- **Class**: Dùng để mô hình hóa đối tượng, bao gồm:
  - **Properties**: Thuộc tính (đặc tính) của đối tượng.
  - **Methods**: Hành động/phương thức mà đối tượng có thể thực hiện.
  - Dùng class giúp gói gọn thuộc tính và phương thức "dính liền" với đối tượng, khởi tạo ngắn gọn, tránh code rải rác khó quản lý.
- **Extends (Kế thừa)**:
  - Là cơ chế cho phép một class mới ("thừa hưởng") các thuộc tính và phương thức từ class cha.
  - Sử dụng hàm `super()` trong `constructor` của class con để gọi tới hàm tạo của class cha.

## 4. Page Object Model (POM)
- **Định nghĩa**: Là một design pattern (mẫu thiết kế) giúp tạo ra cấu trúc code automation test "sạch đẹp" và dễ bảo trì.
- **Core concept**: 
  - Mỗi trang web (page) được biểu diễn bằng một Class.
  - Mỗi Class chứa các **Properties** (là các locators/web elements trên trang) và **Methods** (các hành động thao tác với trang web, thường bắt đầu bằng một động từ như `fill`, `click`).
- **Ưu điểm (So với không dùng POM)**:
  1. **Dễ bảo trì (Maintainable)**: Các locators được tập trung quản lý ở một nơi. Khi giao diện (UI) thay đổi, chỉ cần cập nhật ở class tương ứng mà không phải sửa ở hàng loạt file test.
  2. **Dễ đọc**: Tách biệt logic test và locators, giúp code gọn gàng, trong sáng.
  3. **Tái sử dụng code (Reusability)**: Có thể dễ dàng gọi lại các methods ở nhiều test cases khác nhau.
- **Tiêu chuẩn của POM**: Không có một chuẩn chung duy nhất cho POM, nó phụ thuộc vào framework, ngôn ngữ lập trình, sở thích hoặc kinh nghiệm của người thiết kế (Author).

POM sẽ giúp bạn tách biệt bài test làm 2 phần rõ rệt:
- **File Page (UI - Giao diện)**: Nơi chứa danh sách các phần tử (Elements/Locators) và các hành động (Actions/Methods) trên trang đó.
- **File Test (Kịch bản)**: Nơi chỉ chứa các bước kiểm thử (Test Steps) và kiểm tra kết quả (Assertions).

### 4.1. Cấu trúc chi tiết File Page (UI)
File Page đóng vai trò là một "Bản đồ và Cuốn cẩm nang" của một trang web cụ thể. Nó định nghĩa trang web đó gồm những gì và có thể làm được những gì.

#### 4.1.1. Khai báo thuộc tính (Properties/Variables)
- **Khái niệm**: Là nơi liệt kê danh sách toàn bộ các thành phần giao diện (Elements) sẽ xuất hiện trong kịch bản test.
- **Quy tắc**: 
  - Thường sẽ khai báo tên biến và kiểu dữ liệu (Locator hoặc string).
  - Tuyệt đối không gán giá trị hay viết `page.locator()` ở phần này.

#### 4.1.2. Hàm khởi tạo (Constructor)
- **Khái niệm**: Là hàm tự động chạy đầu tiên ngay khi đối tượng Page được tạo ra (bằng lệnh `new`). Nó đóng vai trò "nạp năng lượng" và gán giá trị thực tế cho các thuộc tính ở trên.
- **Quy tắc**:
  - Bắt buộc phải nhận tham số `page: Page` từ file test truyền sang. Nếu không có page này, class sẽ không thể điều khiển được trình duyệt.
  - Phải có dòng `this.page = page;` để lưu lại tab trình duyệt vào biến toàn cục của class.
  - Đây là nơi duy nhất bạn gán các chuỗi XPath/CSS Selector hoặc viết hàm `page.locator(...)` để định vị phần tử.

#### 4.1.3. Các hàm hành động (Methods/Actions)
- **Khái niệm**: Là nơi định nghĩa các hành động cụ thể mà một người dùng có thể làm trên trang đó (nhập chữ, click chuột, chọn checkbox, lấy text...).
- **Quy tắc**:
  - Tất cả các hàm hành động bắt buộc phải có từ khóa `async` ở đầu hàm.
  - Bên trong hàm, các câu lệnh tương tác với trình duyệt (như `.fill()`, `.click()`) bắt buộc phải có từ khóa `await` đứng trước.
  - Hàm nào cần điền dữ liệu thì phải khai báo tham số nhận vào (ví dụ: `username: string`).
  - Tuyệt đối không viết các câu lệnh kiểm tra kết quả (như `expect(...)`) ở trong các hàm hành động này.

### 4.2. Cấu trúc chi tiết File Test (Script)
File Test đóng vai trò là một "Đạo diễn". Nó không trực tiếp nhúng tay vào tìm element, mà nó chỉ ra lệnh cho các Page thực hiện hành động theo đúng kịch bản mong muốn.

#### 4.2.1. Nhóm bài test (`test.describe`)
- **Khái niệm**: Là một cái "hộp lớn" dùng để gom nhóm các bài test có liên quan chặt chẽ với nhau (ví dụ: nhóm test Đăng ký, nhóm test Đăng nhập).
- **Quy tắc**: Hàm callback bên trong `test.describe` không được phép dùng `async`.

#### 4.2.2. Khai báo biến Page đối tượng (Page Object Variable)
- **Khái niệm**: Tạo ra một cái tên đại diện cho trang (ví dụ: `let registerPage;`).
- **Quy tắc**: Bắt buộc phải dùng từ khóa `let` (không dùng `const`) và phải đặt ngay dưới dòng `test.describe`, nằm ngoài tất cả các hàm hook hay hàm test. Điều này giúp các hàm bên dưới có thể dùng chung biến này mà không bị lỗi khuất tầm nhìn (Scope).

#### 4.2.3. Hàm tiền xử lý (`test.beforeEach`)
- **Khái niệm**: Là hàm dọn đường, chuẩn bị sẵn sàng mọi thứ trước khi bước vào bài test chính thức.
- **Quy tắc**:
  - Phải sử dụng `async ({ page })` để nhận tab trình duyệt trống từ Playwright.
  - Là nơi thực hiện lệnh khởi tạo đối tượng bằng từ khóa `new` (ví dụ: `registerPage = new RegisterPage(page);`).
  - Thường chứa hành động điều hướng đầu tiên (như mở trang chủ hoặc mở form cần test).

#### 4.2.4. Hàm kiểm thử chính thức (`test`)
- **Khái niệm**: Là nơi diễn ra kịch bản test thực tế và đưa ra kết luận bài test đó Đạt (Pass) hay Hỏng (Fail).
- **Quy tắc**:
  - Bắt buộc phải có từ khóa `async () => { ... }`.
  - Chỉ gọi các hàm hành động từ file Page ra theo đúng thứ tự kịch bản (ví dụ: Điền tên → Điền Email → Click Register).
  - Phải chứa các câu lệnh Assertion (`expect`) ở cuối bài test để kiểm tra xem hệ thống có chạy đúng kỳ vọng hay không (đây là điểm khác biệt lớn nhất so với file Page).

## 5. Quy tắc "Sống còn" khi học POM Cơ bản
- **Từ khóa `this`**: Bên trong file Page, khi muốn gọi bất kỳ thuộc tính hoặc hàm nào đã khai báo trong class, bắt buộc phải có chữ `this.` đứng trước (Ví dụ: `this.page`, `this.xpathUserName`).
- **Từ khóa `await`**: Tất cả các hành động tương tác với trình duyệt (như `.goto()`, `.click()`, `.fill()`, `.locator()`) đều là hành động bất đồng bộ. Bắt buộc phải có `await` ở trước để Playwright xếp hàng đợi chạy tuần tự, nếu thiếu sẽ bị lỗi chạy vượt hoặc lỗi logic.
- **Phạm vi biến (Scope)**: Đối tượng page (ví dụ `let registerPage`) phải được khai báo ở trên cùng của `test.describe` thì mới dùng chung được cho cả `beforeEach` và `test()`.
- **Khi nào dùng Locator vs string?**
  - **Dùng Locator** cho element cố định, duy nhất (ô input, nút bấm cụ thể) $\rightarrow$ Code ngắn, Playwright tự động tối ưu hóa việc chờ.
  - **Dùng string** khi cần nối chuỗi động (Ví dụ: truyền tên trang `'01-xpath-register-page.html'` từ file test vào để ghép thành một câu XPath hoàn chỉnh bằng dấu backtick \` \`).

## 6. Luồng đi của dữ liệu khi test vận hành
Khi bạn ấn nút Run Test:
1. Playwright tạo ra một tab trình duyệt trống (`page`).
2. `beforeEach` lấy tab trống đó nạp vào class qua câu lệnh `new RegisterPage(page)`.
3. Vào trang chủ, chuyển sang trang đăng ký.
4. Vào bài `test()`, lệnh `fillUserName('Thu')` được kích hoạt $\rightarrow$ Dữ liệu chữ `'Thu'` được ném từ file test sang file Page $\rightarrow$ Hàm `.fill()` nhét chữ `'Thu'` vào đúng ô có XPath đã cấu hình.
