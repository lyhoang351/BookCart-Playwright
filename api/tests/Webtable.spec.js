const { test, expect } = require('@playwright/test');

test('Web Table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator('#productTable');

    //1. Number of rows, columns
    const columns = await table.locator('xpath=./thead//th');
    console.log('columns', await columns.count());

    const rows = await table.locator('xpath=./tbody/tr');
    console.log('rows', await rows.count());

    // //2. check a specific row
    // const rowId = 1;
    // const specificRowCheckBox = await table.locator(
    //     `xpath=./tbody//td[text() = '${rowId}']/following-sibling::td/input`
    // );
    // await specificRowCheckBox.click();
    // expect(specificRowCheckBox).toBeChecked;
    // await page.waitForTimeout(5000);

    //-------------------
    const rowProduct = 'Product 4';
    const matchRow = rows.filter({
        has: page.locator('td'),
        hasText: rowProduct,
    });
    await matchRow.locator('input').check();
    await page.waitForTimeout(5000);

    //3. select mutiple rows
    // const rowIds = [1, 3];
    // for (const id of rowIds) {
    //     const specificRowCheckBox = await table.locator(
    //         `xpath=./tbody//td[text() = '${id}']/following-sibling::td/input`
    //     );
    //     await specificRowCheckBox.click();
    //     expect(specificRowCheckBox).toBeChecked;
    // }
    // await page.waitForTimeout(5000);

    //
});
