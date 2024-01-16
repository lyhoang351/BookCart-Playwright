import { Page, expect } from '@playwright/test';
export default class PageAssert {
    constructor(private page: Page) {}

    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
    async assertTitleContain(title: string) {
        await expect(await this.page.title()).toContain(title);
    }
    async assertUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }
    async assertUrlContain(url: string) {
        await expect(await this.page.url()).toContain(url);
    }
}
