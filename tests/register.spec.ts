import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage';
import HeaderPage from '../pages/headerPage';
import LoginPage from '../pages/loginPage';
import PageAssert from '../configs/pageAssert';
import user from '../configs/testData/registerUser.json';
import { randomUsername } from '../configs/utils/random.utils';
import { REGISTER_FORM_ERROR_MESSAGE } from '../configs/constants/error.constants';

async function registerUser(page) {
    const registerPage = new RegisterPage(page);
    const username = await randomUsername();
    await registerPage.register({ ...user, username });
    await page.waitForTimeout(2000);
    await registerPage.clickOnRegisterButton();
    await expect(await (await registerPage.getErrorInput()).count()).toBe(0);
    await page.waitForURL(/.+login/);

    return { ...user, username };
}

test.beforeEach('Go to register page', async ({ page }) => {
    const header = new HeaderPage(page);
    const login = new LoginPage(page);
    const pageAssert = new PageAssert(page);

    await page.goto('/');

    //Navigate to Login page
    await header.clickOnLoginButton();
    await pageAssert.assertUrlContain('login');

    //Navigate to Register page
    await login.clickOnRegisterButton();
    await pageAssert.assertUrlContain('register');
});
test('Register successfully', async ({ page }) => {
    await registerUser(page);
});
test('Register failed when missing data in form', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.clickOnRegisterButton();
    await expect(
        await (await register.getErrorInput()).count()
    ).toBeGreaterThan(0);
});
test('Register failed when missing gender', async ({ page }) => {
    const register = new RegisterPage(page);
    const username = await randomUsername();
    const { gender, ...data } = user;
    await register.register({ ...data, username });
    await page.waitForTimeout(2000);
    await register.clickOnRegisterButton();

    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('login');
});
test('Register failed when inputting invalid username', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const newUser = await registerUser(page);
    await registerPage.goto();
    const username = newUser.username;
    await registerPage.register({ ...user, username });
    await page.waitForTimeout(2000);
    await registerPage.clickOnRegisterButton();
    await expect(
        await (await registerPage.getErrorInput()).count()
    ).toBeGreaterThan(0);
    await expect(await (await registerPage.getErrorMessage()).count()).toBe(1);
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('login');
});
test('Register failed when inputting mismatched confirm password', async ({
    page,
}) => {
    const registerPage = new RegisterPage(page);
    const username = await randomUsername();
    await registerPage.register({
        ...user,
        username,
        confirmPassword: 'anotherPassword',
    });
    await page.waitForTimeout(2000);
    await registerPage.clickOnRegisterButton();
    await expect(
        await (await registerPage.getErrorInput()).count()
    ).toBeGreaterThan(0);
    await expect(await (await registerPage.getErrorMessage()).count()).toBe(1);
    await expect(
        await (await registerPage.getErrorMessage()).allInnerTexts()
    ).toContain(REGISTER_FORM_ERROR_MESSAGE.CONFIRM_PASSWORD);
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('login');
});
test('Go to login page successfuly', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.clickOnLoginButton();
    await page.waitForURL(/.+login/);
    await expect(page).toHaveURL(/.+login/);
});
