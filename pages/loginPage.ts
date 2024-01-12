import { Page } from '@playwright/test';

export default class LoginPage {
    constructor(private page: Page) {
        this.page = page;
    }

    private elements = {
        usernameInput: '#mat-input-2',
        passwordInput: '#mat-input-3',
        passwordVisibilityIcon:
            '//input[@id="mat-input-3"]/parent::div/following-sibling::div/mat-icon',
        loginButton: '//form//button[.="Login"]',
    };

    async login(username: string = '', password: string = '') {
        await this.page.fill(this.elements.usernameInput, username);
        await this.page.fill(this.elements.passwordInput, password);
        await this.page.click(this.elements.loginButton);
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

    async clickOnLoginButton() {
        await this.page.click(this.elements.loginButton);
    }
}
