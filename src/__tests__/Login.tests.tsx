import {
  render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Login from '../pages/Login';
import store from '../store/store';
import server from '../mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

const history = createMemoryHistory();

beforeEach(() => {
  render(<Provider store={store}><Router history={history}><Login /></Router></Provider>);
});
test('test if all elements are rendered', () => {
  const username = screen.getByLabelText(/Username/);
  const password = screen.getByLabelText(/Password/);
  const login = screen.getByText(/Login/i);
  const checkbox = screen.getByText(/Stay logged in/);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
});

test('test input change function', () => {
  userEvent.type(screen.getByLabelText(/Username/), 'my user name');
  userEvent.type(screen.getByLabelText(/Password/), 'secret password');
  expect(screen.getByLabelText(/Username/)).toHaveValue('my user name');
  expect(screen.getByLabelText(/Password/)).toHaveValue('secret password');
});

test('test login', async () => {
  const pushSpy = jest.spyOn(history, 'push');

  userEvent.type(screen.getByLabelText(/Username/), 'test-user');
  userEvent.type(screen.getByLabelText(/Password/), 'test-password');
  userEvent.click(screen.getByText(/Login/));

  await waitFor(() => {
    expect(pushSpy).toBeCalledWith('/');
    expect(history.location.pathname).toBe('/');
  });
});
