import { Page } from '@playwright/test';
import BaseFunction from '../configs/utils/baseFunctions';
import { el } from '@faker-js/faker';
export default class HeaderPage {
    private base: BaseFunction;
    constructor(private page: Page) {
        this.base = new BaseFunction(page);
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
        loginButton: '//button[.="Login"]',
        userButton: `//button[contains(., "account_circle")]`,
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
        const cartContent = await this.page
            .locator(this.elements.cartButton)
            .innerText();
        return cartContent.split('\n')[1];
    }

    clickOnLoginButton = async () => {
        await this.base.waitForVisibleAndClick(this.elements.loginButton);
    };

    async getCurrentUser() {
        const userButtonText = await this.page.locator(
            this.elements.userButton
        );
        console.log('userButtonText', await userButtonText);
        const text = await userButtonText?.textContent({ timeout: 3000 });
        return text?.split(' ')[1];
    }
}
