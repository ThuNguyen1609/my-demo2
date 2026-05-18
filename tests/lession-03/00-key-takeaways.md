I. Khai báo biến
Note: biến ~ biến thiên ~ thay đổi được
Cú pháp:
<từ khoá> <tên biến> = <giá trị>
Trong đó: từ khoá có thể dùng let hoặc var, ví dụ:
let myAge = 18;
var myName = Thu;
console.log(myAge);
console.log(myName);
Sự khác nhau:
1. var -> có thể khai báo lại, let -> ko thể khai báo lại
Ví dụ:
var x = 1;
var x = 2;
-> OK
let x = 1;
let x = 2;
-> Lỗi: Identifier 'y' has already been declared
2. var có phạm vi global, còn let thì phạm vi theo block
Note: Code nằm trong cặp ngoặc nhọn được gọi là “một block code”
    {
    var a = 10;
    let b = 11;
    }
    console.log(a); // In ra: 10
    console.log(b); // Lỗi: ReferenceError: b is not defined

II. Khai báo hằng
Note: hằng ~ hằng số ~ ko thay đổi ~ khai báo cho các giá trị ko có nhu cầu thay đổi hoặc chỉ dùng 1 lần
Cú pháp:
<từ khoá> <tên hằng> = <giá trị>
Trong đó: từ khoá mặc định là const
Ví dụ:
const PI = 3.14

Khi nào dùng biến, khi nào dùng hằng
- Mặc định dùng const - giúp code an toàn hơn, dễ đọc
hơn
- Chỉ dùng let khi chắc chắn cần gán lại giá trị
- Không dùng var


III. Kiểu dữ liệu
Các kiểu dữ liệu hay dùng: number, string, boolean
const myAge = 18;
const myName = "Thu"; // dùng dấu nháy nào cũng được: " ' `, miễn là 1 cặp giống nhau
const isLove = true;
console.log(typeof myAge);
console.log(typeof myName);
console.log(typeof isLove);


IV. Toán tử
1. Toán tử so sánh:
Mục đích: dùng để so sánh 2 toán hạng -> kết quả trả về luôn ở dạng boolean
● So sánh bằng
    == và ===
● So sánh không bằng
    !
● So sánh lớn hơn, nhỏ hơn
    >
    <
    <=
    >=
Note: luôn dùng so sánh ===, chỉ dùng == khi có chủ đích và ko quan tâm kiểu dữ liệu
● && (AND): trả về đúng nếu cả 2 vế của mệnh đề đúng
● || (OR): trả về đúng nếu một trong 2 vế của mệnh đề đúng

2. Toán tử logic
● && (AND): trả về đúng nếu cả 2 vế của mệnh đề đúng
● || (OR): trả về đúng nếu một trong 2 vế của mệnh đề đúng
Ví dụ:
    const x = true;
    const y = false;
    const result1 = x || y;
    const result 2 = x && y;
    console.log (result1); //true
    console.log (result2); //false

3. Toán tử một ngôi
Định nghĩa: Toán tử một ngôi là toán tử chỉ cần một toán hạng để thực hiện ~ bên cạnh dấu +/- chỉ có 1 biến
Ví dụ: 
    x++ -> 1 ngôi
    x+1=y  -> 2 ngôi
Hai loại:
● Prefix: toán tử nằm ở phía trước - tăng trước, trả về sau
Ví dụ: x = 5; y = ++x
-> tăng x lên 1 rồi mới trả về
-> x = 6, y =6 
● Postfix: toán tử nằm ở phía sau - trả về trước, tăng sau
Ví dụ: x = 5; y = x++
-> tăng sau, trả về giá trị cũ
-> x = 5, y = 6
IV. Câu điền kiện
Mục đích: để kiểm tra một đoạn logic trước khi chạy, nếu điều kiện đúng thì mới chạy
Ví dụ:
    const thamNien = 6;
    let thuong = 0;
    if (thamNien >= 1 && thamNien < 3){
        xepHang = 0 ;
    } else if (thamNien < 6){
        thuong = 200;
    } else {
        thuong = 500;
    }
    console.log(thuong);
Note:
- set luôn thuong = 1 trong 2 giá trị biên để code ngắn gọn gàng hơn, ko rơi vào 3 case ở nhánh thì sẽ gán luôn vào biến đã khai báo ban đầu
- dùng kết hợp toán tử logic cho gọn


V. Vòng lặp
Mục đích: lặp 1 đoạn logic nhất định hoặc vô hạn, tuỳ vào điều kiện dừng
Cú pháp hay dùng: for (<điều kiện khởi tạo>; <điều kiện dừng>; <cập nhật>)
Ví dụ:
    for (let i = 0; i < 5; i++>){
        console.log("Xin chào);
    }
-> vòng 1: i = 0 -> Xin chào
-> vòng 2: i = 1 -> Xin chào
-> vòng 3: i = 2 -> Xin chào
-> vòng 4: i = 3 -> Xin chào
-> vòng 5: i = 4 -> Xin chào
-> vòng 1: i = 5 -> vi phạm i < 5  -> dừng

VI. Other
Cách format code đẹp: Option + Shif + F hoặc chuột phải chọn Format Document
Console nâng cao:
let address = "Thái Bình";
//template literal
console.log(`Tôi đang ở ${address}`);
-> dùng ` và có $ trước biến