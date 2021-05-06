import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
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
