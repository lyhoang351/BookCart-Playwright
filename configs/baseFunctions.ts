import { Page } from '@playwright/test';

export default class BaseFunction {
    constructor(private page: Page) {}
    async waitForVisibleAndClick(xpath: string) {
        const element = this.page.locator(`xpath = ${xpath}`);
        await element.waitFor({ state: 'visible' });
        await element.click();
    }
}
