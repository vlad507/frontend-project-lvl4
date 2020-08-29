import faker from 'faker';
import cookies from 'js-cookie';

export default () => {
  const userName = cookies.get('name');
  if (userName) {
    return userName;
  }
  const newName = faker.internet.userName();
  cookies.set('name', newName);
  return newName;
};
