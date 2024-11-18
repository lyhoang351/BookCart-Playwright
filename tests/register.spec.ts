import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage';
import HeaderPage from '../pages/headerPage';
import LoginPage from '../pages/loginPage';
import PageAssert from '../configs/utils/pageAssert';
import user from '../configs/testData/registerUser.json';
import { randomUsername } from '../configs/utils/random.utils';
import { REGISTER_FORM_ERROR_MESSAGE } from '../configs/constants/error.constants';
import credential from '../configs/testData/loginUser.json';
import registerPage from '../pages/registerPage';

// test.beforeEach('Go to register page', async ({ page }) => {
//     const header = new HeaderPage(page);
//     const login = new LoginPage(page);
//     const pageAssert = new PageAssert(page);

//     await page.goto('/');

//     //Navigate to Login page
//     await header.clickOnLoginButton();
//     await pageAssert.assertUrlContain('login');

//     //Navigate to Register page
//     await login.clickOnRegisterButton();
//     await pageAssert.assertUrlContain('register');
// });

test('Register successfully', async ({ page }, testInfo) => {
    const register = new RegisterPage(page, testInfo);
    console.log('testInfo.title', testInfo);
    await test.step('Given navigate to register page', async () => {
        await register.goto();
    });

    await register.takeScreenShot();

    await test.step('When register new user', async () => {
        await register.registerUser();
    });

    await test.step('Then verify that URL contains "login"', async () => {
        await register.assertUrlContain('login');
    });

    await register.takeScreenShot();
});
test.describe('Register failed', () => {
    test.describe.configure({ mode: 'parallel' });
    test('When missing data in form', async ({ page }, testInfo) => {
        const register = new RegisterPage(page, testInfo);
        await register.goto();
        await register.takeScreenShot();

        await register.clickOnRegisterButton();
        await expect(
            await (await register.getErrorInput()).count()
        ).toBeGreaterThan(0);
        await register.takeScreenShot();
    });

    test('When missing gender', async ({ page }, testInfo) => {
        const register = new RegisterPage(page, testInfo);
        await register.goto();
        await register.takeScreenShot();

        const username = await randomUsername();
        const { gender, ...data } = user;
        await register.register({ ...data, username });
        await page.waitForTimeout(2000);
        await register.takeScreenShot();

        await register.clickOnRegisterButton();
        await register.takeScreenShot();

        await page.waitForTimeout(2000);
        expect(page.url()).not.toContain('login');
    });
    test('When inputting existed username', async ({ page }, testInfo) => {
        const register = new RegisterPage(page, testInfo);
        await register.goto();
        await register.takeScreenShot();

        const username = credential.username;
        await register.register({ ...user, username });
        await page.waitForTimeout(2000);
        await register.takeScreenShot();

        await register.clickOnRegisterButton();
        await register.takeScreenShot();

        const errorInput = await register.getErrorInput();
        await expect(await errorInput.count()).toBeGreaterThan(0);

        const errorMessage = await register.getErrorMessage();
        await expect(await errorMessage.count()).toBe(1);
        await page.waitForTimeout(2000);

        expect(page.url()).not.toContain('login');
    });

    test('When inputting mismatched confirm password', async ({
        page,
    }, testInfo) => {
        const register = new RegisterPage(page, testInfo);
        await register.goto();

        const username = await randomUsername();
        await register.register({
            ...user,
            username,
            confirmPassword: 'anotherPassword',
        });
        await page.waitForTimeout(2000);
        await register.clickOnRegisterButton();

        const errorInput = await register.getErrorInput();
        await expect(await errorInput.count()).toBeGreaterThan(0);

        const errorMessage = await register.getErrorMessage();
        await expect(await errorMessage.count()).toBe(1);
        await expect(await errorMessage.textContent()).toEqual(
            REGISTER_FORM_ERROR_MESSAGE.CONFIRM_PASSWORD
        );
        await page.waitForTimeout(2000);

        expect(page.url()).not.toContain('login');
    });
});

test('Go to login page successfully', async ({ page }, testInfo) => {
    const register = new RegisterPage(page, testInfo);
    await register.goto();

    await register.clickOnLoginButton();
    await page.waitForURL(/.+login/);

    await expect(page).toHaveURL(/.+login/);
});
