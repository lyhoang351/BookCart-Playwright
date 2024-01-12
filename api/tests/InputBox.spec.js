const { test, expect } = require('@playwright/test');

test('Input Box', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const inputBox = await page.locator("//input[@id='name']");
    await expect(inputBox).toBeEmpty();
    await expect(inputBox).toBeVisible();
    await expect(inputBox).toBeEditable();

    await inputBox.fill('Linh Giac');

    await page.waitForTimeout(5000);
});

test('Radio Button', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const maleRadio = await page.locator("//input[@id='male']");
    const femaleRadio = await page.locator("//input[@id='female']");

    await expect(maleRadio).toBeEnabled();

    await maleRadio.check();

    await expect(maleRadio).toBeChecked();
    expect(await maleRadio.isChecked()).toBeTruthy();
    expect(await femaleRadio.isChecked()).toBeFalsy();

    await page.waitForTimeout(5000);
});
