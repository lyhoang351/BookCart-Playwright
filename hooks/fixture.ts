import { Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    loginPage: LoginPage,
};
