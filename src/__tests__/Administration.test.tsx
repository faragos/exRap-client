import {
  render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Administration from '../pages/Administration';
import store from '../store/store';
import server from '../mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

beforeEach(() => {
  render(<Provider store={store}><Administration /></Provider>);
});

test('render Administration Component', async () => {
  const linkElement = screen.getByText(/Administration/i);
  expect(linkElement).toBeInTheDocument();
});

test('test add new user', async () => {
  userEvent.type(screen.getByLabelText(/username/), 'testuser');
  userEvent.type(screen.getByLabelText('name'), 'user1');
  userEvent.type(screen.getByLabelText(/firstName/), 'Max Muster');
  userEvent.type(screen.getByLabelText(/initial/), 'MM');
  userEvent.type(screen.getByLabelText(/mailAddress/), 'max.muster@gmail.com');
  userEvent.type(screen.getByLabelText(/status/), 'Active');
  userEvent.click(screen.getByText('add'));

  await waitFor(() => {
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });
});
