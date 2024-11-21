// import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage';
import user from '../configs/testData/registerUser.json';
import { randomUsername } from '../configs/utils/random.utils';
import { REGISTER_FORM_ERROR_MESSAGE } from '../configs/constants/error.constants';
import credential from '../configs/testData/loginUser.json';
import {test, expect} from '../hooks/fixture'

    test('Register successfully', async ({ page, register }, testInfo) => {
        console.log('testInfo.title', testInfo);
        await test.step('Given user navigate to register page', async () => {
            await register.goto();
            await register.takeScreenShot();
        });

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
        test('When missing data in form', async ({ page, register }, testInfo) => {
            await test.step("Given user navigate to register page'", async () => {
                await register.goto();
                await register.takeScreenShot();
            });

            await test.step("When user click on register button'", async () => {
                await register.clickOnRegisterButton();
            });

            await test.step("Then verify that error is displayed'", async () => {
                await expect(
                    await (await register.getErrorInput()).count()
                ).toBeGreaterThan(0);
                await register.takeScreenShot();
            });
        });

        test('When missing gender', async ({ page, register }, testInfo) => {
            await test.step("Given user navigate to register page'", async () => {
                await register.goto();
                await register.takeScreenShot();
            });

            await test.step("When user enter user name", async () => {
                const username = await randomUsername();
                const { gender, ...data } = user;
                await register.register({ ...data, username });
                await page.waitForTimeout(2000);
                await register.takeScreenShot();
            });

            await test.step("And user click on register button'", async () => {
                await register.clickOnRegisterButton();
            });

            await test.step("Then verify that login page is not appear'", async () => {
                await page.waitForTimeout(2000);
                expect(page.url()).not.toContain('login');
                await register.takeScreenShot();
            });
        });
        test('When inputting existed username', async ({ page, register }, testInfo) => {
            await test.step("Given user navigate to register page'", async () => {
                await register.goto();
                await register.takeScreenShot();
            });

            await test.step("When user enter an existed user name", async () => {
                const username = credential.username;
                await register.register({ ...user, username });
                await page.waitForTimeout(2000);
                await register.takeScreenShot();
            });

            await test.step("And user click on register button'", async () => {
                await register.clickOnRegisterButton();
            });
            
            await test.step("Then verify that error is displayed'", async () => {
                const errorInput = await register.getErrorInput();
                await expect(await errorInput.count()).toBeGreaterThan(0);
    
                const errorMessage = await register.getErrorMessage();
                await expect(await errorMessage.count()).toBe(1);
                await page.waitForTimeout(2000);
            });

            await test.step("Then verify that login page is not appear'", async () => {
                await page.waitForTimeout(2000);
                expect(page.url()).not.toContain('login');
                await register.takeScreenShot();
            });
        });

        test('When inputting mismatched confirm password', async ({ page, register }, testInfo) => {
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
            await expect(await (await errorMessage.textContent()).trim()).toEqual(
                REGISTER_FORM_ERROR_MESSAGE.CONFIRM_PASSWORD
            );
            await page.waitForTimeout(2000);

            expect(page.url()).not.toContain('login');
        });
    });

    test('Go to login page successfully', async ({ page, register}, testInfo) => {
        await register.goto();

        await register.clickOnLoginButton();
        await page.waitForURL(/.+login/);

        await expect(page).toHaveURL(/.+login/);
    });
