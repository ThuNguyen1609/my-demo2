import { test, expect } from '@playwright/test';
import { NotesPage } from './pom4';

test.describe('Test 4 - Bài tập Personal Notes với cấu trúc POM', () => {
    let notesPage: NotesPage;

    // Giả lập dữ liệu 10 bài báo từ VnExpress
    const mockArticles = [
        { title: '[Khoa học] Kính viễn vọng James Webb phát hiện tinh vân mới', content: 'Các nhà khoa học vừa công bố hình ảnh mới nhất từ kính viễn vọng không gian. Tinh vân này cách trái đất hàng triệu năm ánh sáng. Đây là bước tiến lớn trong ngành thiên văn học.' },
        { title: '[Khoa học] Công nghệ pin mật độ cao cho xe điện phát triển mạnh', content: 'Thế hệ pin mới giúp xe điện chạy được quãng đường gấp đôi hiện tại. Thời gian sạc đầy cũng giảm xuống đáng kể dưới mười phút. Nhiều hãng xe lớn bắt đầu thử nghiệm.' },
        { title: '[Khoa học] Tìm thấy hóa thạch loài khủng long ăn cỏ mới', content: 'Các nhà khảo cổ vừa khai quật bộ xương nguyên vẹn tại sa mạc. Loài này sống vào khoảng cuối kỷ Phấn Trắng với kích thước khổng lồ. Phát hiện giúp bổ sung chuỗi tiến hóa.' },
        { title: '[Khoa học] Ứng dụng AI vào dự báo thời tiết chính xác hơn', content: 'Mô hình trí tuệ nhân tạo mới có khả năng tính toán siêu tốc độ. Nó đưa ra cảnh báo thiên tai sớm trước vài ngày so với phương pháp cũ. Độ chính xác đạt tới mức tối đa.' },
        { title: '[Khoa học] Sự cố rác thải không gian đe dọa các vệ tinh', content: 'Mật độ các mảnh vỡ tên lửa cũ đang ngày càng dày đặc quỹ đạo. Chuyên gia cảnh báo nguy cơ va chạm đang tăng cao trong năm nay. Các nước cần có giải pháp thu hồi gấp.' },
        { title: '[Khoa học] Phát hiện nguồn nước ngầm khổng lồ dưới lòng đất', content: 'Bản đồ địa chất mới phát hiện túi nước có dung tích cực kỳ lớn. Nguồn nước sạch này có thể cung cấp cho hàng triệu người dân vùng hạn mặn. Công tác bảo vệ đang được triển khai.' },
        { title: '[Khoa học] Nghiên cứu mới về gen giúp kéo dài tuổi thọ chuột', content: 'Thử nghiệm can thiệp chuỗi gen đã cho kết quả vô cùng khả quan. Sức khỏe của chuột thí nghiệm cải thiện rõ rệt, đẩy lùi lão hóa. Giới khoa học kỳ vọng ứng dụng trên người.' },
        { title: '[Khoa học] Tàu vũ trụ robot chuẩn bị đổ bộ lên mặt trăng', content: 'Sứ mệnh không người lái nhằm tìm kiếm khoáng sản quý hiếm sắp bắt đầu. Con tàu dự kiến sẽ đáp xuống vùng tối của mặt trăng vào tuần tới. Mọi hệ thống đang hoạt động hoàn hảo.' },
        { title: '[Khoa học] Phát minh vật liệu siêu nhẹ thay thế nhựa', content: 'Loại vật liệu sinh học mới có độ bền tương đương thép nhưng nhẹ hơn. Đặc biệt nó có khả năng tự phân hủy hoàn toàn trong môi trường tự nhiên. Giải pháp xanh cho tương lai.' },
        { title: '[Khoa học] Hiện tượng ấm lên toàn cầu làm thay đổi dòng hải lưu', content: 'Dữ liệu vệ tinh cho thấy tốc độ dòng chảy đang chậm lại rõ rệt. Điều này có thể gây ra những kiểu thời tiết cực đoan trên diện rộng. Các nhà khí hậu kêu gọi hành động.' }
    ];

    test.beforeEach(async ({ page }) => {
        notesPage = new NotesPage(page);
        await notesPage.openMaterialPage();
        await notesPage.openPersonalPage();
    });

    test('Thực hiện thêm 10 note, tìm kiếm và kiểm tra kết quả', async () => {

        //Thêm mới articles
        await test.step('Thêm mới 10 note từ dữ liệu bài báo', async () => {
            for (let i = 0; i < mockArticles.length; i++) {
                const article = mockArticles[i];
                await notesPage.createNote(article.title, article.content);
            }
        });

        //Tìm kiếm theo từ khoá 
        const searchKeyword = 'Khoa học';
        await test.step('Thực hiện search theo keyword', async () => {
            await notesPage.searchNotesByKeyword(searchKeyword);
        });

        //kiểm tra trả về đúng 10 articles sau khi tìm kiếm
        await test.step('Kiểm tra tất cả các bài báo search được đều chứa keyword', async () => {
            await expect(notesPage.getNoteCount()).toContainText('10');
        });

    });
});