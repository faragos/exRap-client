import { cleanup } from '@testing-library/react';
import store from '../store/store';
import {
  setCredentials,
  clearUser,
} from '../store/authInfo/reducers';

afterEach(cleanup);

// TODO: move this tests to page tests like a user input
test('set user credantials to redux store', () => {
  const testAuthInfo = {
    username: 'TestUser',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  const expectedAuthInfo = {
    username: 'TestUser',
    token: 'asdfewrabaer5t24q5g',
    isAuthenticated: true,
  };
  store.dispatch(setCredentials(testAuthInfo));
  const { authInfo } = store.getState();
  expect(authInfo).toMatchObject(expectedAuthInfo);
});

test('logoutUser', () => {
  const testAuthInfo = {
    username: 'TestUser',
    token: 'asdfewrabaer5t24q5g',
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
