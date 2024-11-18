import { expect, test, Page, TestInfo } from '@playwright/test';
import {
    RegisterFormDataType,
    RegisterFormFieldType,
    RegisterGenderType,
} from '../configs/interfaces/register';
import { BasePage } from './basePage';
import { randomUsername } from '../configs/utils/random.utils';
import user from '../configs/testData/registerUser.json';

export default class RegisterPage extends BasePage {
    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }
    private elements = {
        registerInput: (formField: string) =>
            `//input[@formcontrolname ="${formField}"]`,
        genderSelector: (gender: string) =>
            `//mat-radio-button[@value="${gender}"]`,
        loginButton: '//div[@class="container"]//button[.="Login"]',
        registerButton: '//button[.="Register"]',
        errorMessage: '//mat-error',
        errorInput: '//input[contains(@class, "ng-invalid")]',
    };

    async goto() {
        await super.goto('/register');
    }

    async clickOnLoginButton() {
        await this.waitForVisibleAndClick(this.elements.loginButton);
    }

    async clickOnRegisterButton() {
        await super.waitForVisibleAndClick(this.elements.registerButton);
        await this.takeScreenShot();
    }

    async enterInput(field: RegisterFormFieldType, value: string) {
        await this.page.fill(this.elements.registerInput(field), value);
    }

    async enterGender(value: RegisterGenderType) {
        await this.page.click(this.elements.genderSelector(value));
    }

    async register(data: RegisterFormDataType) {
        const { gender = '', ...inputData } = data;
        for (let [key, value] of Object.entries(inputData)) {
            await test.step(`And fill in ${key} input`, async () => {
                await this.page.fill(this.elements.registerInput(key), value);
            });
        }
        if (gender !== '') {
            await test.step(`And click on ${gender}`, async () => {
                await this.page.click(this.elements.genderSelector(gender));
            });
        }
    }

    async getErrorMessage() {
        return await this.page.locator(this.elements.errorMessage);
    }

    async getErrorInput() {
        return await this.page.locator(this.elements.errorInput);
    }

    async registerUser() {
        const username = randomUsername();
        await this.register({ ...user, username });
        await this.page.waitForTimeout(2000);

        await this.takeScreenShot();
        await test.step('And click on Register button', async () => {
            await this.clickOnRegisterButton();
        });
        await this.page.waitForURL(/.+login/);

        return { ...user, username };
    }
}
