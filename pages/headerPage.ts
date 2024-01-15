import { Page } from '@playwright/test';
import BaseFunction from '../configs/baseFunctions';
export default class HeaderPage {
    constructor(private page: Page, private base: BaseFunction) {}
    private elements = {
        loginButton: '//button[.="Login"]',
    };

    clickOnLoginButton = async () => {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    };
}
