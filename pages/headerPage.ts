import { test, Page, TestInfo } from '@playwright/test';
import BaseFunction from '../configs/utils/baseFunctions';
import { el } from '@faker-js/faker';
import { BasePage } from './basePage';
export default class HeaderPage extends BasePage {
    constructor(page: Page, testInfo?: TestInfo) {
        super(page, testInfo);
    }

    private elements = {
        brandTitleButton: '//div[@class="brand-title"]/button',
        searchInput: '//input[@placeholder="Search books or authors"]',
        searchOptions: '//div[@id="cdk-overlay-9"]//mat-option',
        cartButton:
            '//mat-toolbar-row//span[contains(normalize-space(),"shopping_cart")]/parent::button',
        changeThemeButton:
            '//button[@mattooltip="Select a theme for the site"]',
        changeThemeOptions: '//div[@id="cdk-overlay-14"]//button',
        loginButton: '//button[normalize-space()="Login"]',
        usernameText: `//mat-toolbar//mat-icon[normalize-space() = 'account_circle']//following-sibling::span[@class='mdc-button__label']//span`,
        logoutButton: '//button[text()="Logout"]',
        myOrdersButton: '//button[text()="My Orders"]',
    };

    async gotoHome() {
        await this.page.click(this.elements.brandTitleButton);
    }

    async search(value) {
        await this.page.fill(this.elements.searchInput, value);
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.elements.searchOptions).nth(0).click();
    }

    async clickOnCart() {
        await this.page.click(this.elements.cartButton);
    }

    async getNumberOfItemsInCart() {
        return await test.step('Get number of Items in Cart', async () => {
            const cartContent = await this.page
                .locator(this.elements.cartButton)
                .innerText();
            return cartContent.split('\n')[1];
        });
    }

    clickOnLoginButton = async () => {
        await test.step('Click on Login button on the header', async () => {
            await this.waitForVisibleAndClick(this.elements.loginButton);
        });
    };

    async getCurrentUser() {
        return await test.step('Get Current username', async () => {
            const usernameText = this.page.locator(
                this.elements.usernameText
            );

            return await usernameText?.textContent({ timeout: 3000 });
        });
    }
}
