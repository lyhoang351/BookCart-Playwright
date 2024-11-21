import { test as base, Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';

// Declare the types of your fixtures.
type MyFixtures = {
    page: Page,
    login: LoginPage;
    register: RegisterPage;
  };
  export const test = base.extend<MyFixtures>({
    page: async ({ page }, use) => {
      await use(page);
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