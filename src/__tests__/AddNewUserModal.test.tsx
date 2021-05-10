import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../store/store';
import server from '../mocks/server';
import { UserOverview } from '../gen/auth.api.generated';
import AddNewUserModal from '../components/modals/AddNewUserModal';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.

afterAll(() => server.close());

const setIsModalOpenMock = jest.fn();

const normalUser : UserOverview = {
  id: 1,
  userName: 'testuser',
  name: 'User',
  firstName: 'Test',
  mailAddress: 'user@example.com',
  status: 'Active',
};

const emptyUser : UserOverview = {
  id: 0,
  userName: '',
  name: '',
  firstName: '',
  mailAddress: '',
  status: 'Active',
};

function renderUserModal(user: UserOverview) {
  render(
    <Provider store={store}>
      <AddNewUserModal
        isModalOpen
        setIsModalOpen={setIsModalOpenMock}
        user={user}
      />
    </Provider>,
  );
}

test('handle close modal on edit submit', async () => {
  renderUserModal(normalUser);
  userEvent.click(screen.getByText('Speichern'));
  expect(setIsModalOpenMock).toBeCalledWith(false);
});

test('handle close modal on new user without changing values should not be called', async () => {
  renderUserModal(emptyUser);
  userEvent.click(screen.getByText('Speichern'));
  expect(setIsModalOpenMock).not.toBeCalledWith(false);
});
