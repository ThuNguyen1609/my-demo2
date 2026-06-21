import { Locator, Page } from '@playwright/test';
import { MaterialBasePage } from './01-pom';

export class NotesPage extends MaterialBasePage {
    inputTitle: Locator;
    inputContent: Locator;
    buttonAddNote: Locator;
    inputSearch: Locator;
    noteCount: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Khởi tạo
        this.inputTitle = page.locator("//input[@id='note-title']");
        this.inputContent = page.locator("//textarea[@id='note-content']");
        this.buttonAddNote = page.locator("//button[@id='add-note']");
        this.inputSearch = page.locator("//input[@id='search']");
        this.noteCount = page.locator("//div[@id='note-count']");
    }

    //Thêm một Note mới
    async createNote(title: string, content: string) {
        await this.inputTitle.fill(title);
        await this.inputContent.fill(content);
        await this.buttonAddNote.click();
    }

    //Tìm kiếm theo từ khóa
    async searchNotesByKeyword(keyword: string) {
        await this.inputSearch.fill(keyword);
    }

    // Trả về danh sách note để asssert
    getNoteCount(): Locator {
        return this.noteCount;
    }
}