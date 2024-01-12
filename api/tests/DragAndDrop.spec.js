const { test, expect } = require('@playwright/test');

test('Drag and Drop', async ({ page }) => {
    page.goto(
        'https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager'
    );
    const frame = await page.frameLocator(
        'xpath = //iframe[@data-src="../../demoSite/practice/droppable/photo-manager.html"]'
    );

    const fromLocator = await frame.locator(
        'xpath=//h5[text()="High Tatras"]/parent::li'
    );

    const toLocator = await frame.locator('#trash');

    // await fromLocator.hover();
    // await page.mouse.down();
    // await toLocator.hover();
    // await page.mouse.up();

    await fromLocator.dragTo(toLocator);

    await page.waitForTimeout(5000);
});
