const { test, expect } = require('@playwright/test');

test('Dropdown', async ({ page }) => {
    await page.goto('https://jquery-az.com/boots/demo.php?ex=63.0_2');

    const dropdownButton = await page.$(
        '//button[contains(@class,"dropdown-toggle")]'
    );

    const optionList = ['jQuery', 'Bootstrap'];

    await dropdownButton.click();

    await page.waitForTimeout(5000);

    const options = await page.$$(
        '//ul[contains(@class, "dropdown-menu")]/li[not(contains(@class, "multiselect-item"))]'
    );

    for (let option of options) {
        if ((await option.getAttribute('class')) == null) {
            console.log('1');
            await option.click();

            // await page.waitForTimeout(1000);
        }
    }

    await page.waitForTimeout(5000);

    const selectedOptions = await page.$$(
        '//ul[contains(@class, "dropdown-menu")]/li[@class = "active"]'
    );

    await expect(selectedOptions.length).toBe(11);
    await page.waitForTimeout(5000);
});
