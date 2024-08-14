import { test, expect } from '@playwright/test';

test('GET method', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
});
test('POST request', async ({ request }) => {
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data: {
                method: 'POST',
                body: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    );

    const responseJson = await response.json();
    // console.log('responseJson', responseJson);
    // console.log('response.status', response.status());
});
