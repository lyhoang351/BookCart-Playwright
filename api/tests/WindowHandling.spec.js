const { test, expect, chromium } = require('@playwright/test');

test('Window Handling', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page).toHaveTitle('Automation Testing Practice');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await page.getByRole('button', { name: 'New Browser Window' }).click(),
    ]);

    await expect(newPage).toHaveTitle('Your Store');
});
