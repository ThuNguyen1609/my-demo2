## I. Các mối quan hệ trong DOM và XPath

### 1. Parent (Thẻ cha)
- **Định nghĩa:** Phần tử chứa trực tiếp bên ngoài (chỉ có duy nhất 1 cha trực hệ).
- **XPath:** `/parent::*` hoặc ngắn gọn là `/..`

### 2. Children (Thẻ con)
- **Định nghĩa:** Tập hợp toàn bộ phần tử trực tiếp ở tầng ngay dưới (con ruột).
- **XPath:** `/child::*` hoặc viết ngắn gọn là `/*`

### 3. Ancestor (Tổ tiên)
- **Định nghĩa:** Tất cả cấp trên (cha, ông, cố...) đi thẳng lên tới gốc `<html>`.
- **XPath:** `/ancestor::*` (hoặc `/ancestor-or-self::*` nếu tính cả chính nó).

### 4. Descendant (Hậu duệ / Con cháu)
- **Định nghĩa:** Toàn bộ các thẻ lồng bên trong, không phân biệt độ sâu (con, cháu, chắt...).
- **XPath:** `/descendant::*` hoặc viết tắt quen thuộc là `//*` (ví dụ: `//div//span` tức là tìm `span` là hậu duệ của `div`).

### 5. Sibling (Anh chị em)
- **Định nghĩa:** Các thẻ có chung một cha ruột trực tiếp.
- **XPath:** Kết hợp bằng toán tử hợp (`|`): `preceding-sibling::* | following-sibling::*`

### 6. Following-sibling (Anh em đi sau)
- **Định nghĩa:** Các phần tử anh em (chung cha) xuất hiện phía sau nó trên file code.
- **XPath:** `/following-sibling::*` (Rất hay dùng trong automation test để dò tìm ô nhập liệu bên cạnh nhãn tiêu đề tĩnh).

### 7. Preceding-sibling (Anh em đi trước)
- **Định nghĩa:** Các phần tử anh em (chung cha) xuất hiện trước nó trên file code
- **XPath:** `/preceding-sibling::*`

### 8. Following (Đi sau toàn cục)
- **Định nghĩa:** Toàn bộ phần tử nằm sau nó trên cấu trúc file HTML (ngoại trừ các phần tử con cháu của chính nó).
- **XPath:** `/following::*`

### 9. Preceding (Đi trước toàn cục)
- **Định nghĩa:** Toàn bộ phần tử nằm trước nó trên cấu trúc file HTML (ngoại trừ các tổ tiên trực hệ của nó).
- **XPath:** `/preceding::*`

---

## II. XPath Advance Methods (Phương thức trục XPath)

Phương thức trục XPath (XPath axes methods) được sử dụng để điều hướng và chọn các node trong cây DOM dựa trên mối quan hệ giữa các node với nhau.

**Công dụng:**
*   Tìm kiếm các phần tử dựa trên vị trí tương đối (parent, child, sibling, ancestor,...).
*   Linh hoạt hơn việc chỉ dùng đường dẫn tuyệt đối hoặc tương đối thông thường.

**Cú pháp tổng quát:**
```xpath
//tag/relationship::tagname[@attr='value']
```

### 2.1. Wildcard `*`
Ký tự `*` đại diện cho việc khớp tất cả các thẻ.
*   Ví dụ `//div`: Chỉ khớp các thẻ `div`.
*   Ví dụ `//*`: Khớp tất cả các loại thẻ trong toàn bộ DOM.

### 2.2. child (Con trực tiếp)
Tìm phần tử con trực tiếp.
*   **Ví dụ:** Tìm tất cả các button con trực tiếp của form `test-form`.
    ```xpath
    //form[@id='test-form']/child::button
    ```

### 2.3. descendant (Tất cả con cháu)
Tìm tất cả các phần tử hậu duệ ở mọi cấp.
*   **Ví dụ:** Tìm tất cả input bên trong form.
    ```xpath
    //form[@id='test-form']/descendant::input
    ```

### 2.4. parent (Tìm cha)
Từ phần tử hiện tại, tìm ngược lên phần tử cha trực tiếp.
*   **Ví dụ:** Tìm form cha của button có text là "Create Test Case".
    ```xpath
    //button[text()='Create Test Case']/parent::form
    ```

### 2.5. ancestor (Tìm tổ tiên)
Từ phần tử hiện tại, tìm ngược lên các phần tử tổ tiên.
*   **Ví dụ:** Từ button "Edit" trong bảng, tìm thẻ `table` bao ngoài nó.
    ```xpath
    //button[@class='btn-edit']/ancestor::table
    ```

### 2.6. following-sibling (Anh em phía sau)
Tìm phần tử anh em nằm cùng cấp và ở phía sau.
*   **Ví dụ 1:** Từ label "Test Case Name", tìm input cùng cấp ngay sau nó.
    ```xpath
    //label[@for='testName']/following-sibling::input
    ```
*   **Ví dụ 2:** Trong bảng, từ cột có chữ "Login Validation", lấy các cột tiếp theo bên phải.
    ```xpath
    //td[text()='Login Validation']/following-sibling::td
    ```

### 2.7. preceding-sibling (Anh em đứng trước)
Tìm phần tử anh em nằm cùng cấp và ở phía trước.
*   **Ví dụ:** Từ button "Reset Form", tìm button đứng ngay trước nó.
    ```xpath
    //button[@class='btn-reset']/preceding-sibling::button
    ```

### 2.8. following (Tất cả node sau trong document)
Tìm tất cả các node nằm phía sau trong tài liệu.
*   **Ví dụ:** Từ thẻ `h2` "Test Cases List", tìm tất cả các button "Run Test" nằm sau nó.
    ```xpath
    //h2[text()='Test Cases List']/following::button[@class='btn-run']
    ```

### 2.9. preceding (Tất cả node trước trong document)
Tìm tất cả các node nằm phía trước trong tài liệu.
*   **Ví dụ:** Từ thẻ `h2` "Test Execution Results", tìm tất cả các thẻ `td` ưu tiên cao nằm trước đó.
    ```xpath
    //h2[text()='Test Execution Results']/preceding::td[@class='priority-high']
    ```

### 2.10. ancestor-or-self / descendant-or-self
Bao gồm tổ tiên/hậu duệ hoặc **chính bản thân node đó** (nếu thỏa mãn điều kiện).
*   **Ví dụ:** Tìm tất cả thẻ `span` chứa class `status` nằm trong table (hoặc chính table nếu nó là `span`).
    ```xpath
    //table[@id='test-table']/ancestor-or-self::span[contains(@class, 'status')]
    ```

---

## III. Các hàm và toán tử nâng cao trong XPath

### 3.1. Truy cập thuộc tính bằng `@`
Sử dụng ký hiệu `@` để truy cập và kiểm tra thuộc tính của element.
```xpath
//tagname[@attribute='value']
```

### 3.2. Toán tử logic `AND` và `OR`
Kết hợp nhiều điều kiện khi tìm kiếm.
*   **AND** (Tất cả điều kiện phải đúng):
    ```xpath
    //element[@condition1 and @condition2]
    ```
*   **OR** (Một trong các điều kiện đúng):
    ```xpath
    //element[@condition1 or @condition2]
    ```

### 3.3. Lấy Text tuyệt đối `text()`
Lấy text node trực tiếp của element và yêu cầu khớp chính xác 100%.
```xpath
//element[text()='exact text']
```

### 3.4. Chuẩn hóa khoảng trắng `normalize-space()`
Loại bỏ các khoảng trắng thừa ở đầu, cuối và thay thế các khoảng trắng liên tiếp ở giữa đoạn text bằng một dấu cách duy nhất. Giúp tìm kiếm text chính xác hơn khi HTML có format lộn xộn.
```xpath
//element[normalize-space(text())='exact text without extra spaces']
```

### 3.5. Kiểm tra chuỗi con `contains()`
Tìm element có chứa một phần text hoặc một phần giá trị thuộc tính (không cần khớp chính xác toàn bộ).
*   Kiểm tra theo thuộc tính:
    ```xpath
    //element[contains(@attribute, 'substring')]
    ```
*   Kiểm tra theo text:
    ```xpath
    //element[contains(text(), 'substring')]
    ```