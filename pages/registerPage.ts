import { Page } from '@playwright/test';
import {
    RegisterFormDataType,
    RegisterFormFieldType,
    RegisterGenderType,
} from '../configs/interfaces/register';
import BaseFunction from '../configs/baseFunctions';

export default class {
    constructor(private page: Page, private base: BaseFunction) {}
    private elements = {
        registerInput: (formField: RegisterFormFieldType) =>
            `//input[@formcontrolname =${formField}]`,
        genderSelector: (gender: RegisterGenderType) =>
            `//mat-radio-button[@value=${gender}]`,
        loginButton: '//div[@class="container"]//button[.="Login"]',
        registerButton: '//button[.="Register"]',
    };

    async clickOnLoginButton() {
        await this.base.waitForVisibleAndClick(
            `xpath=${this.elements.loginButton}`
        );
    }

    async clickOnRegisterButton() {
        await this.base.waitForVisibleAndClick(
            `xpath=${this.elements.registerButton}`
        );
    }

    async enterInput(field: RegisterFormFieldType, value: string) {
        await this.page.fill(this.elements.registerInput(field), value);
    }

    async enterGender(value: RegisterGenderType) {
        await this.page.click(this.elements.genderSelector(value));
    }

    async register(data: RegisterFormDataType) {
        const { gender, ...inputData } = data;
        for (let i = 0; i < Object.keys(data).length; i++) {}
    }
}
