const { test, expect } = require('@playwright/test');

// test('Home Page', async ({ page }) => {
//     await page.goto('https://demoblaze.com/index.html');
//     const pageTitle = await page.title();
//     console.log(pageTitle);

//     await expect(page).toHaveTitle('STORE');
//     await page.close();
// });

test('Locator', async ({ page }) => {
    const username = 'pavanol';
    await page.goto('https://demoblaze.com/index.html');
    await page.click('//a[@id="login2"]');
    await page.fill('//input[@id="loginusername"]', username);
    await page.fill('//input[@id="loginpassword"]', 'test@123');
    await page.click('//button[text()="Log in"]');
    const logoutLink = await page.locator('//a[@id="logout2"]');
    await expect(logoutLink).toBeVisible();
    const welcomeText = await page.getByText(`Welcome ${username}`);
    console.log(await welcomeText.innerText());
    await expect(welcomeText).toBeVisible();
    // const nav = await page.innerText('//div[@id="navbarExample"]');
    // await console.log(nav);
    // await page.close();
});
