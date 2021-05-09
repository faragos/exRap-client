import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store/store';
import server from '../mocks/server';
import ChangeCredentialsModal from '../components/modals/ChangeCredentialsModal';
import { UserOverview } from '../gen/auth.api.generated';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

const setIsModalOpenMock = jest.fn();

const user : UserOverview = {
  id: 1,
  userName: 'testuser',
  name: 'User',
  firstName: 'Test',
  mailAddress: 'user@example.com',
  status: 'Active',
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <ChangeCredentialsModal
        isModalOpen
        setIsModalOpen={setIsModalOpenMock}
        user={user}
      />
    </Provider>,
  );
});

test('render App Component', async () => {
  expect(await screen.findByText('Passwort ändern')).toBeInTheDocument();
});

test('edit Password ', async () => {
  userEvent.type(screen.getByLabelText('Passwort *'), 'abcd1234');
  userEvent.type(screen.getByLabelText('Passwort wiederholen *'), 'abcd1234');

  userEvent.click(screen.getByText('Speichern'));

  expect(setIsModalOpenMock).toBeCalledWith(false);
});
