const { test, expect } = require('@playwright/test');

test('Alert', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async dialog => {
        await expect(dialog.type()).toBe('alert');
        await expect(dialog.message()).toContain('alert');
        dialog.accept();
    });

    await page.locator('//button[text()="Alert"]').click();
    const context = await browser.newContext();
    context.waitForEvent();
});
