import { cleanup } from '@testing-library/react';
import store from '../store/store';
import {
  setCredentials,
  clearUser,
} from '../store/user/reducers';

afterEach(cleanup);

test('set user credantials to redux store', () => {
  const testUser = {
    username: 'TestUser',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  const expectedUser = {
    username: 'TestUser',
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
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  const emptyUser = {
    username: '',
    token: '',
    isAuthenticated: false,
  };
  store.dispatch(setCredentials(testUser));
  store.dispatch(clearUser());
  const { user } = store.getState();
  expect(user).toMatchObject(emptyUser);
});
