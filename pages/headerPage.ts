import { Page } from '@playwright/test';
export default class HeaderPage {
    constructor(private page: Page) {
        this.page = page;
    }
    private elements = {
        loginButton: '//button[.="Login"]',
    };

    clickOnLoginButton = async () => {
        const button = this.page.locator(this.elements.loginButton);
        await button.waitFor({ state: 'attached' });
        await button.click();
    };
}
