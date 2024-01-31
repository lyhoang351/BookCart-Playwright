import { test } from '@playwright/test';
import HeaderPage from '../pages/headerPage';

test.beforeEach('Go to Home page', async ({ page }) => {
    await page.goto('/');
});
test('get number', async ({ page }) => {
    const header = new HeaderPage(page);
    await header.getNumberOfItemsInCart();
});
