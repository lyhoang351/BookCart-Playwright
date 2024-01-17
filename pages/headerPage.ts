import { Page } from '@playwright/test';
import BaseFunction from '../configs/baseFunctions';
import { el } from '@faker-js/faker';
export default class HeaderPage {
    private base: BaseFunction;
    constructor(private page: Page) {
        this.base = new BaseFunction(page);
    }
    private elements = {
        loginButton: '//button[.="Login"]',
        userButton: `//button[contains(., "account_circle")]`,
        logoutButton: '//button[text()="Logout"]',
        myOrdersButton: '//button[text()="My Orders"]',
    };

    clickOnLoginButton = async () => {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    };

    async getCurrentUser() {
        const userButtonText = await this.page.locator(
            this.elements.userButton
        );
        const text = await userButtonText?.textContent({ timeout: 3000 });
        return text?.split(' ')[1];
    }
}
