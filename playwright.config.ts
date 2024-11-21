import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env',
});

export default defineConfig({
    testDir: './tests',

    fullyParallel: !true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { open: 'never' }],
        ["allure-playwright"]
        // [
        //     'allure-playwright',
        //     {
        //         resultsDir: 'allure-results',
        //     },
        // ],
    ],

    use: {
        baseURL: process.env.BASE_URL,

        trace: 'off',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        ignoreHTTPSErrors: true,
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chromium'],
                viewport: null,

                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
