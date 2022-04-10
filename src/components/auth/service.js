import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';

export const login = ({ remember, ...credentials }) => {
  return client.post('api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken);
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