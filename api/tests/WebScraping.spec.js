import { test, expect } from '@playwright/test';

test('Web Scraping', async ({ page }) => {
    const url =
        'https://www.youtube.com/watch?v=NDu4Nr7eSx4&list=PL8kITySeJdCBSYP7mIJC7qeNjCcdXn5Kz';
    await page.goto(url);
    const videos = await page.$$('ytd-playlist-panel-video-renderer');
    await Promise.all(
        videos?.map(async (video, i) => {
            const name = await (
                await video.$('#video-title')
            ).getAttribute('title');
            console.log(`Video ${i}: `, name);
        })
    );
});
