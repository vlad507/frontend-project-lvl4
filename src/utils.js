import faker from 'faker';
import cookies from 'js-cookie';

export const getUserName = () => cookies.get('name');

export const setUserName = (name) => cookies.set('name', name);

export const getNewName = () => faker.internet.userName();
