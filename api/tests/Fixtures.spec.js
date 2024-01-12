import { test, expect } from '../fixtures/MyFixtures';

test.use({ baseURL: 'https://testautomationpractice.blogspot.com/' });

test('Fixture', async ({ page }) => {
    await expect(page).toHaveTitle('Automation Testing Practice');
});
