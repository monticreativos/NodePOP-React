import client, {
  configureClient,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';

export const login = ({ remember, ...credentials }) => {
  return client
  .post('api/auth/login', credentials)
  .then(({ accessToken }) => {
    configureClient({ accessToken });
      return accessToken;
  })
  .then(accessToken => {
    storage.remove('auth');
    if (remember) {
      storage.set('auth', accessToken);
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};

export const createUser = (user) => {
  console.log(user)
  return client.post('api/auth/signup', user).then(( response ) => {
})
};
