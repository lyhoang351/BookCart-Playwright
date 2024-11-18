import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import credential from '../configs/testData/loginUser.json';
import HeaderPage from '../pages/headerPage';
import { randomUsername } from '../configs/utils/random.utils';
import { LOGIN_ERROR_MESSAGE } from '../configs/constants/error.constants';


test('Go to Register Page successfully', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);

    loginPage.goto();
    await loginPage.clickOnRegisterButton();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/.+register/);
});

test('Login successfully', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);
    const header = new HeaderPage(page, testInfo);

    await loginPage.goto();

    await loginPage.login({ ...credential });
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('login');

    const loggedUsername = await header.getCurrentUser();
    expect(loggedUsername).toBe(credential.username);
});

test.describe('Login failed', () => {
    test.describe.configure({ mode: 'parallel' });

    test('When missing username', async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);

        await loginPage.goto();
        await loginPage.login({ username: '', password: credential.password });

        await loginPage.assertErrorInputEqual(loginPage.elements.errorInput, 1);
        await loginPage.assertErrorMessageEqual(
            loginPage.elements.errorMessage,
            LOGIN_ERROR_MESSAGE.REQUIRED_USERNAME
        );
    });

    test('When missing password', async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);

        loginPage.goto();
        await loginPage.login({ username: credential.username, password: '' });

        await loginPage.assertErrorInputEqual(loginPage.elements.errorInput, 1);
        await loginPage.assertErrorMessageEqual(
            loginPage.elements.errorMessage,
            LOGIN_ERROR_MESSAGE.REQUIRED_PASSWORD
        );
    });

    test('When inputting incorrect credential', async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);

        loginPage.goto();
        const newUsername = await randomUsername();
        await loginPage.login({
            username: newUsername,
            password: 'wrongPassword',
        });
        await page.waitForTimeout(3000);

        await loginPage.assertErrorInputGreaterThan(
            loginPage.elements.errorInput,
            0
        );
        await loginPage.assertErrorMessageEqual(
            loginPage.elements.errorMessage,
            LOGIN_ERROR_MESSAGE.INVALID_CREDENTIAL
        );
    });
});

