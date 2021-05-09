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
  const linkElement = await screen.getByText(/Administration/i);
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

test('create new User', async () => {
  userEvent.click(screen.getByText('Neuer Mitarbeiter erfassen'));

  userEvent.type(screen.getByLabelText(/Vorname/), 'test');
  userEvent.type(screen.getByLabelText(/Nachname/), 'user1');
  userEvent.type(screen.getByLabelText(/Kürzel/), 'tusr1');
  userEvent.type(screen.getByLabelText(/Mail/), 'testuser1@ost.ch');
  userEvent.type(screen.getByLabelText(/Rolle hinzufügen/), 'ProjectContributor');
  userEvent.type(screen.getByLabelText('Passwort *'), 'test1234');
  userEvent.type(screen.getByLabelText('Passwort wiederholen *'), 'test1234');

  userEvent.click(screen.getByText('Speichern'));

  const testUserName = await screen.findByText(/test user1/);
  const testUserInitial = await screen.findByText('tusr1');

  expect(testUserName).toBeInTheDocument();
  expect(testUserInitial).toBeInTheDocument();
}, 20000);

test('render edit User Component', async () => {
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

test('edit User', async () => {
  const buttons = await screen.findAllByTestId('editUserButton');

  userEvent.click(buttons[0]);

  userEvent.type(screen.getByLabelText(/Vorname/), '-edit');
  userEvent.type(screen.getByLabelText(/Nachname/), '-edit');
  userEvent.type(screen.getByLabelText(/Kürzel/), '-edit');

  userEvent.click(screen.getByText('Speichern'));

  const editFirstname = await screen.findByText(/Test-edit/);
  const editLastname = await screen.findByText(/User-edit/);
  const editInitial = await screen.findByText('testuser-edit');

  expect(editFirstname).toBeInTheDocument();
  expect(editLastname).toBeInTheDocument();
  expect(editInitial).toBeInTheDocument();
});

test('render edit Password Component', async () => {
  const buttons = await screen.findAllByTestId('editPasswordButton');
  userEvent.click(buttons[0]);

  const editPasswordModalText = await screen.findByText(/Passwort ändern/i);
  const enterPasswordModalText = await screen.getByLabelText('Passwort *');
  const secondEnterPasswordModalText = await screen.getByLabelText('Passwort wiederholen *');

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
