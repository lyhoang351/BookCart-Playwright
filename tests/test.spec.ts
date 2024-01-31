import { test, expect, chromium } from '@playwright/test';

test('Test', async () => {
    expect(1).toBe(1);
});

test('Go to Login page successfully', async ({ page }) => {
    await page.goto('https://bookcart.azurewebsites.net/login');

    //Generic assertion
    expect(page.url()).toContain('login');

    await page.waitForTimeout(3000);
    // //Async assertion
    // await expect(page).toHaveURL(/.+login/);

    // //Negative assertion
    // expect(page.url()).not.toContain('register');
    // await expect(page).not.toHaveURL(/.+register/);
});

test('basic test', async () => {
    const newBrowser = await chromium.launch();
    const newContext = await newBrowser.newContext();
    const newPage = await newContext.newPage();

    await newPage.goto('https://playwright.dev/');
    const name = await newPage.innerText('.navbar__title');
    expect(name).toBe('Playwright');
});
