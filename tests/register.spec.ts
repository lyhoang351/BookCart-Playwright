import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage';
import HeaderPage from '../pages/headerPage';
import LoginPage from '../pages/loginPage';
import PageAssert from '../configs/pageAssert';
import user from '../configs/testData/registerUser.json';
import { randomUsername } from '../configs/utils/random.utils';

test.beforeEach('Go to register page', async ({ page }) => {
    const header = new HeaderPage(page);
    const login = new LoginPage(page);
    const pageAssert = new PageAssert(page);

    await page.goto('https://bookcart.azurewebsites.net/');

    //Navigate to Login page
    await header.clickOnLoginButton();
    await pageAssert.assertUrlContain('login');

    //Navigate to Register page
    await login.clickOnRegisterButton();
    await pageAssert.assertUrlContain('register');
});
test('Register successfully', async ({ page, request }) => {
    const registerPage = new RegisterPage(page);
    const username = randomUsername();

    await registerPage.register({ ...user, username });

    await page.waitForTimeout(3000);
    await registerPage.clickOnRegisterButton();
    console.log('error', await (await registerPage.getInvalidInput()).count());
    await expect(await (await registerPage.getInvalidInput()).count()).toBe(0);

    await page.waitForURL('/login\b/gm');
    page.waitForResponse;

    await page.waitForTimeout(3000);
});
