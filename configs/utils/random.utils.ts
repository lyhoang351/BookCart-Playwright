import { faker } from '@faker-js/faker';

export const randomUsername = async () => {
    const username = faker.internet.userName();
    const response = await fetch(
        `https://bookcart.azurewebsites.net/api/User/validateUserName/${username}`
    );
    const value = await response.json();
    if (value === false) {
        return username;
    } else {
        return await randomUsername();
    }
};
