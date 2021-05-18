import { cleanup } from '@testing-library/react';
import jwt from 'jsonwebtoken';
import store from '../store/store';
import {
  setCredentials,
  clearUser,
} from '../store/authInfo/reducers';

afterEach(cleanup);
let token: string;
beforeAll(() => {
  token = jwt.sign({
    name: 'test-user',
    role: 'Admin',
    nbf: Date.now() / 1000,
    exp: Date.now() / 1000 + (60 * 30),
    iat: Date.now() / 1000,
  }, 'secret');
});
test('set user credantials to redux store', () => {
  const testAuthInfo = {
    username: 'TestUser',
    token,
    isAuthenticated: true,
  };
  const expectedAuthInfo = {
    username: 'TestUser',
    token,
    isAuthenticated: true,
  };
  store.dispatch(setCredentials(testAuthInfo));
  const { authInfo } = store.getState();
  expect(authInfo).toMatchObject(expectedAuthInfo);
});

test('logoutUser', () => {
  const testAuthInfo = {
    username: 'TestUser',
    token,
    isAuthenticated: true,
  };
  const emptyAuthInfo = {
    username: '',
    token: '',
    isAuthenticated: false,
  };
  store.dispatch(setCredentials(testAuthInfo));
  store.dispatch(clearUser());
  const { authInfo } = store.getState();
  expect(authInfo).toMatchObject(emptyAuthInfo);
});
