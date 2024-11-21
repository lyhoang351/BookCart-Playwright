import { test, Page, TestInfo } from '@playwright/test';
import BaseFunction from '../configs/utils/baseFunctions';
import { LoginCredentialDataType } from '../configs/interfaces/login';
import { BasePage } from './basePage';

export default class LoginPage extends BasePage {
    constructor(page: Page, testInfo?: TestInfo) {
        super(page, testInfo);
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
        await test.step('Go to Login Page', async () => {
            await this.page.goto('/login');
        });
    }

    async clickOnRegisterButton() {
        await test.step('Click on Register Button on Login Page', async () => {
            await this.waitForVisibleAndClick(this.elements.registerButton);
        });
    }

    async enterUsername(username: string) {
        await test.step('Enter username', async () => {
            await this.page.fill(this.elements.usernameInput, username);
        });
    }

    async enterPassword(password: string) {
        await test.step('Enter password', async () => {
            await this.page.fill(this.elements.passwordInput, password);
        });
    }

    async clickOnLoginButton() {
        await test.step('Click on Login button', async () => {
            await this.waitForVisibleAndClick(this.elements.loginButton);
        });
    }

    async login(credential: LoginCredentialDataType) {
        const { username, password } = credential;
        await this.enterUsername(username);
        await this.enterPassword(password);

        await this.takeScreenShot();
        await this.clickOnLoginButton();
    }

    async showPassword() {
        if (
            (await this.page
                .locator(this.elements.passwordVisibilityIcon)
                .textContent()) === 'visibility_off'
        ) {
            await test.step('Click on visibility icon on password input', async () => {
                await this.page.click(this.elements.passwordVisibilityIcon);
            });
        }
    }
}
