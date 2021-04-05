import { cleanup } from '@testing-library/react';
import index from '../store/index';
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
  index.dispatch(setCredentials(testUser));
  const { user } = index.getState();
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
  index.dispatch(setCredentials(testUser));
  index.dispatch(logoutUser());
  const { user } = index.getState();
  expect(user).toMatchObject(emptyUser);
});
