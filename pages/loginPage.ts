import { Page } from '@playwright/test';
import BaseFunction from '../configs/utils/baseFunctions';
import { LoginCredentialDataType } from '../configs/interfaces/login';
import { BasePage } from './basePage';

export default class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public elements = {
        usernameInput: '//input[@formcontrolname ="username"]',
        passwordInput: '//input[@formcontrolname ="password"]',
        passwordVisibilityIcon:
            '//input[@id="mat-input-3"]/parent::div/following-sibling::div/mat-icon',
        loginButton: '//form//button[.="Login"]',
        registerButton: '//button[.="Register"]',
        errorInput: '//input[contains(@class, "ng-invalid")]',
        errorMessage: 'mat-error',
    };

    async goto() {
        await this.page.goto('/login');
    }

    async clickOnRegisterButton() {
        await this.waitForVisibleAndClick(this.elements.registerButton);
    }

    async enterUsername(username: string) {
        await this.page.fill(this.elements.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.elements.passwordInput, password);
    }

    async clickOnLoginButton() {
        await this.waitForVisibleAndClick(this.elements.loginButton);
    }

    async login(credential: LoginCredentialDataType) {
        const { username, password } = credential;
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
}
