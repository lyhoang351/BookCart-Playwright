import { test as base, Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import HeaderPage from '../pages/headerPage';

// Declare the types of your fixtures.
type MyFixtures = {
    page: Page;
    header: HeaderPage;
    login: LoginPage;
    register: RegisterPage;
};
export const test = base.extend<MyFixtures>({
    page: async ({ page }, use) => {
        await use(page);
    },

    header: async ({ page }, use, testInfo) => {
        // Set up the fixture.
        const header = new HeaderPage(page, testInfo);

        // Use the fixture value in the test.
        await use(header);
    },

    login: async ({ page }, use, testInfo) => {
        // Set up the fixture.
        const login = new LoginPage(page, testInfo);

        // Use the fixture value in the test.
        await use(login);
    },

    register: async ({ page }, use, testInfo) => {
        await use(new RegisterPage(page, testInfo));
    },
});
export { expect } from '@playwright/test';