import { expect, Page } from '@playwright/test';

export abstract class BasePage {
    constructor(protected page: Page) {}

    async goto(url: string) {
        await this.page.goto(url);
    }
    async waitForVisibleAndClick(xpath: string) {
        const element = this.page.locator(`xpath = ${xpath}`);
        await element.waitFor({ state: 'visible' });
        await element.click();
        await this.page.waitForTimeout(1000);
    }

    async getErrorMessage(element: string) {
        return await this.page.locator(element);
    }

    async getErrorInput(element: string) {
        return await this.page.locator(element);
    }

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

    async assertErrorInputEqual(element: string, errorCounts: number) {
        const errorInput = await this.getErrorInput(element);
        expect(await errorInput.count()).toBe(errorCounts);
    }

    async assertErrorInputGreaterThan(element: string, errorCounts: number) {
        const errorInput = await this.getErrorInput(element);
        expect(await errorInput.count()).toBeGreaterThan(errorCounts);
    }

    async assertErrorMessageEqual(element: string, errorMessage: string) {
        const errorMessageActual = await this.getErrorMessage(element);
        expect(await errorMessageActual.textContent()).toContain(errorMessage);
    }
}
