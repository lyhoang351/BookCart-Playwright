import { Page } from '@playwright/test';
import BaseFunction from '../configs/baseFunctions';

export default class LoginPage {
    private base: BaseFunction;
    constructor(private page: Page) {
        this.base = new BaseFunction(page);
    }

    private elements = {
        usernameInput: '#mat-input-2',
        passwordInput: '#mat-input-3',
        passwordVisibilityIcon:
            '//input[@id="mat-input-3"]/parent::div/following-sibling::div/mat-icon',
        loginButton: '//form//button[.="Login"]',
        registerButton: '//button[.="Register"]',
        errorMessage: 'mat-error',
    };

    async clickOnRegisterButton() {
        await this.base.waitForVisibleAndClick(this.elements.registerButton);
    }
    async enterUsername(username: string) {
        await this.page.fill(this.elements.usernameInput, username);
    }
    async enterPassword(password: string) {
        await this.page.fill(this.elements.passwordInput, password);
    }
    async clickOnLoginButton() {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    }
    async login(username: string = '', password: string = '') {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickOnLoginButton();
    }

    async showPassword() {
        if (
            (await this.page
                .locator(this.elements.passwordVisibilityIcon)
                .textContent()) === 'visibility_off'
        ) {
            await this.page.click(this.elements.passwordVisibilityIcon);
        }
    }

    getErrorMessage() {
        return this.page.locator('mat-error');
    }
}
