import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
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

test('render create new User Component', async () => {
  userEvent.click(screen.getByText('Neuer Mitarbeiter erfassen'));

  const addFirstnameToUserModalText = await screen.findByText(/Vorname/i);
  const addLastnameToUserModalText = await screen.findByText(/Nachname/i);
  const addInitialToUserModalText = await screen.findByText(/Kürzel/i);
  const addMailToUserModalText = await screen.findByText(/Mail/i);

  expect(addFirstnameToUserModalText).toBeInTheDocument();
  expect(addLastnameToUserModalText).toBeInTheDocument();
  expect(addInitialToUserModalText).toBeInTheDocument();
  expect(addMailToUserModalText).toBeInTheDocument();
});

test('render edit Person Component', async () => {
  const buttons = await screen.findAllByTestId('editUserButton');
  userEvent.click(buttons[0]);

  const addFirstnameToUserModalText = await screen.findByText(/Vorname/i);
  const addLastnameToUserModalText = await screen.findByText(/Nachname/i);
  const addInitialToUserModalText = await screen.findByText(/Kürzel/i);
  const addMailToUserModalText = await screen.findByText(/Mail/i);

  expect(addFirstnameToUserModalText).toBeInTheDocument();
  expect(addLastnameToUserModalText).toBeInTheDocument();
  expect(addInitialToUserModalText).toBeInTheDocument();
  expect(addMailToUserModalText).toBeInTheDocument();
});

test('render edit Password Component', async () => {
  const buttons = await screen.findAllByTestId('editPasswordButton');
  userEvent.click(buttons[0]);

  const editPasswordModalText = await screen.findByText(/Passwort ändern/i);
  const enterPasswordModalText = await screen.findByText('Passwort');
  const secondEnterPasswordModalText = await screen.findByText(/Passwort wiederholen */i);

  expect(editPasswordModalText).toBeInTheDocument();
  expect(enterPasswordModalText).toBeInTheDocument();
  expect(secondEnterPasswordModalText).toBeInTheDocument();
});

test('render delete User Component', async () => {
  const buttons = await screen.findAllByTestId('deleteUserButton');
  userEvent.click(buttons[0]);

  const deleteUserModalText = await screen.findByText(/Löschbestätigung/i);
  expect(deleteUserModalText).toBeInTheDocument();
});

/* test('test add new user', async () => {
  userEvent.click(screen.getByText('Neuer Mitarbeiter erfassen'));

  userEvent.type(screen.getByLabelText(/Vorname/), 'Lukas');
  userEvent.type(screen.getByLabelText(/Nachname/), 'Schlunegger');
  userEvent.type(screen.getByLabelText(/Kürzel/), 'lsc');
  userEvent.type(screen.getByLabelText(/Mail/), 'lukas.schlunegger@ost.ch');
  userEvent.type(screen.getByLabelText('Mitarbeiter hinzufügen'), 'ProjectManager');
  userEvent.type(screen.getByLabelText('Passwort *'), 'test1234');
  userEvent.type(screen.getByLabelText('Passwort wiederholen *'), 'test1234');

  const testUserName = await screen.findByText(/Lukas Schlunegger/);
  const testUserInitial = await screen.findByText('lsc');

  expect(testUserName).toBeInTheDocument();
  expect(testUserInitial).toBeInTheDocument();
}); */
