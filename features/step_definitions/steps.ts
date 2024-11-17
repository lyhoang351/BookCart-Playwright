const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const { fixture } = require('../../hooks/fixture');
const HeaderPage = require('../../pages/headerPage');

let loginPage: any;
let headerPage: any;
const { page } = fixture;

Given('Navigate to Login Page', async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.goto();
    // await fixture.page.goto('https://bookcart.azurewebsites.net/');
});

When(
    'Fill in Login form with {string} and {string}',
    async (username: string, password: string) => {
        await loginPage.login({ username, password });
        await page.waitForTimeout(3000);
    }
);

Then('Verify that URL does not contain login', async () => {
    expect(page.url()).not.toContain('login');
});

Then(
    'Verify that current username is equal with {string}',
    async (username: string) => {
        headerPage = new HeaderPage(page);
        const loggedUsername = await headerPage.getCurrentUser();
        expect(loggedUsername).toBe(username);
    }
);
