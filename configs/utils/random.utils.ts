import { faker } from '@faker-js/faker';

export const randomUsername = async () => {
    const username = faker.internet.userName();
    const response = await fetch(
        `https://bookcart.azurewebsites.net/api/User/validateUserName/${username}`
    );
    if ((await response.json()) === 'false') {
        return username;
    } else {
        return randomUsername();
    }
};
