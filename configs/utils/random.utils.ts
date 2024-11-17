import { faker } from '@faker-js/faker';

export const randomUsername = () => {
    const username = faker.internet.userName();
    return username;
};
