import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import credential from '../configs/testData/loginUser.json';
import HeaderPage from '../pages/headerPage';
import { randomUsername } from '../configs/utils/random.utils';
import { LOGIN_ERROR_MESSAGE } from '../configs/constants/error.constants';

test.beforeEach('Go to login page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
});

test('Go to Register Page successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickOnRegisterButton();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/.+register/);
});



test('Login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const header = new HeaderPage(page);
    await loginPage.login({ ...credential });
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('login');
    const loggedUsername = await header.getCurrentUser();
    console.log('loggedUsername', loggedUsername);
    expect(loggedUsername).toBe(credential.username);
});
test.describe('Login failed', () => {
    test.describe.configure({ mode: 'parallel' });
    test('When missing username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login({ username: '', password: credential.password });
        expect(await (await loginPage.getErrorInput()).count()).toBe(1);
        expect(
            await (await loginPage.getErrorMessage()).textContent()
        ).toContain(LOGIN_ERROR_MESSAGE.REQUIRED_USERNAME);
    });

    test('When missing password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login({ username: credential.username, password: '' });
        expect(await (await loginPage.getErrorInput()).count()).toBe(1);
        expect(
            await (await loginPage.getErrorMessage()).textContent()
        ).toContain(LOGIN_ERROR_MESSAGE.REQUIRED_PASSWORD);
    });

    test('When inputting incorrect credential', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const newUsername = await randomUsername();
        await loginPage.login({
            username: newUsername,
            password: 'wrongPassword',
        });
        await page.waitForTimeout(3000);
        expect(await (await loginPage.getErrorInput()).count()).toBeGreaterThan(
            0
        );
        expect(
            await (await loginPage.getErrorMessage()).textContent()
        ).toContain(LOGIN_ERROR_MESSAGE.INVALID_CREDENTIAL);
    });
});

