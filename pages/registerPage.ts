import { Page } from '@playwright/test';
import {
    RegisterFormDataType,
    RegisterFormFieldType,
    RegisterGenderType,
} from '../configs/interfaces/register';
import BaseFunction from '../configs/baseFunctions';

export default class RegisterPage {
    private base: BaseFunction;
    constructor(private page: Page) {
        this.base = new BaseFunction(page);
    }
    private elements = {
        registerInput: (formField: string) =>
            `//input[@formcontrolname ="${formField}"]`,
        genderSelector: (gender: string) =>
            `//mat-radio-button[@value="${gender}"]`,
        loginButton: '//div[@class="container"]//button[.="Login"]',
        registerButton: '//button[.="Register"]',
        errorMessage: '//mat-error',
        invalidInput: '//input[contains(@class, "ng-invalid")]',
    };

    async goto() {
        await this.page.goto('/register');
    }

    async clickOnLoginButton() {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    }

    async clickOnRegisterButton() {
        await this.base.waitForVisibleAndClick(this.elements.registerButton);
    }

    async enterInput(field: RegisterFormFieldType, value: string) {
        await this.page.fill(this.elements.registerInput(field), value);
    }

    async enterGender(value: RegisterGenderType) {
        await this.page.click(this.elements.genderSelector(value));
    }

    async register(data: RegisterFormDataType) {
        const { gender = '', ...inputData } = data;
        for (let i = 0; i < Object.keys(inputData).length; i++) {
            await this.page.fill(
                this.elements.registerInput(Object.keys(inputData)[i]),
                Object.values(inputData)[i]
            );
        }
        if (gender !== '') {
            await this.page.click(this.elements.genderSelector(gender));
        }
    }

    async getErrorMessage() {
        return await this.page.locator(this.elements.errorMessage);
    }

    async getInvalidInput() {
        return await this.page.locator(this.elements.invalidInput);
    }
}
