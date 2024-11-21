import { test, expect } from '../hooks/fixture';
import LoginPage from '../pages/loginPage';
import credential from '../configs/testData/loginUser.json';
import HeaderPage from '../pages/headerPage';
import { randomUsername } from '../configs/utils/random.utils';
import { LOGIN_ERROR_MESSAGE } from '../configs/constants/error.constants';

test('Go to Register Page successfully', async ({ page, login }, testInfo) => {
    await login.goto();
    await login.takeScreenShot();

    await login.clickOnRegisterButton();
    await login.takeScreenShot();

    await page.waitForTimeout(2000);
    await test.step('Verify that URL contains "register"', async () => {
        await expect(page).toHaveURL(/.+register/);
    });
});

test('Login successfully', async ({ page, login, header }, testInfo) => {
    await login.goto();
    await login.takeScreenShot();

    await login.login({ ...credential });
    await page.waitForTimeout(3000);

    await login.takeScreenShot();
    await test.step('Verify that URL does NOT contain "login"', async () => {
        expect(page.url()).not.toContain('login');
    });

    await page.waitForTimeout(3000);
    const loggedUsername = await header.getCurrentUser();
    await test.step('Verify that current username is displayed correctly', async () => {
        expect(loggedUsername).toBe(credential.username);
    });
});

test.describe('Login failed', () => {
    test.describe.configure({ mode: 'parallel' });

    test('When missing username', async ({ page, login }, testInfo) => {
        await login.goto();
        await login.takeScreenShot();

        await login.login({ username: '', password: credential.password });

        await test.step('Verify that number of error input is 1', async () => {
            await login.assertErrorInputEqual(login.elements.errorInput, 1);
        });
        await test.step('Verify that error message show correctly', async () => {
            await login.assertErrorMessageEqual(
                login.elements.errorMessage,
                LOGIN_ERROR_MESSAGE.REQUIRED_USERNAME
            );
        });
        await login.takeScreenShot();
    });

    test('When missing password', async ({ page, login }, testInfo) => {
        await login.goto();
        await login.takeScreenShot();

        await login.login({ username: credential.username, password: '' });

        await test.step('Verify that number of error input is 1', async () => {
            await login.assertErrorInputEqual(login.elements.errorInput, 1);
        });
        await test.step('Verify that error message show correctly', async () => {
            await login.assertErrorMessageEqual(
                login.elements.errorMessage,
                LOGIN_ERROR_MESSAGE.REQUIRED_PASSWORD
            );
        });
        await login.takeScreenShot();
    });

    test('When inputting incorrect credential', async ({ page, login }) => {
        await login.goto();
        await login.takeScreenShot();

        const newUsername = await randomUsername();
        await login.login({
            username: newUsername,
            password: 'wrongPassword',
        });
        await page.waitForTimeout(3000);

        await test.step('Verify that number of error input is greater than 0', async () => {
            await login.assertErrorInputGreaterThan(
                login.elements.errorInput,
                0
            );
        });
        await test.step('Verify that error message show correctly', async () => {
            await login.assertErrorMessageEqual(
                login.elements.errorMessage,
                LOGIN_ERROR_MESSAGE.INVALID_CREDENTIAL
            );
        });
        await login.takeScreenShot();
    });
});
