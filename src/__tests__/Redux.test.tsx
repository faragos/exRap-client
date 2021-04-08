import { cleanup } from '@testing-library/react';
import store from '../store/store';
import {
  setCredentials,
  logoutUser,
} from '../store/user/reducers';

afterEach(cleanup);

test('set user credantials to redux store', () => {
  const testUser = {
    username: 'TestUser',
    password: '1234Test',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  const expectedUser = {
    username: 'TestUser',
    password: '',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  store.dispatch(setCredentials(testUser));
  const { user } = store.getState();
  expect(user).toMatchObject(expectedUser);
});

test('logoutUser', () => {
  const testUser = {
    username: 'TestUser',
    password: '1234Test',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  const emptyUser = {
    username: '',
    password: '',
    token: '',
    isAuthenticated: false,
  };
  store.dispatch(setCredentials(testUser));
  store.dispatch(logoutUser());
  const { user } = store.getState();
  expect(user).toMatchObject(emptyUser);
});
