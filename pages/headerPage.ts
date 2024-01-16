import { Page } from '@playwright/test';
import BaseFunction from '../configs/baseFunctions';
export default class HeaderPage {
    private base: BaseFunction;
    constructor(private page: Page) {
        this.base = new BaseFunction(page);
    }
    private elements = {
        loginButton: '//button[.="Login"]',
    };

    clickOnLoginButton = async () => {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    };
}
