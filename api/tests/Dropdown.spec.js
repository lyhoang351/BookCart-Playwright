const { test, expect } = require('@playwright/test');

test('Dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown = await page.locator('#country');
    await dropdown.scrollIntoViewIfNeeded();
    await expect(dropdown).toBeInViewport();
    //Select option
    await dropdown.selectOption('Canada');
    await page.waitForTimeout(1000);
    await dropdown.selectOption({ label: 'China' });
    await page.waitForTimeout(1000);
    await dropdown.selectOption({ index: 0 });
    await page.waitForTimeout(1000);
    await dropdown.selectOption({ value: 'france' });
    await page.waitForTimeout(1000);

    // Verify number of select options
    await expect(await dropdown.locator('option')).toHaveCount(10);
});
