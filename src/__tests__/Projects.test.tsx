import {
  render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import jwt from 'jsonwebtoken';
import Project from '../pages/Projects';
import store from '../store/store';
import server from '../mocks/server';
import { setCredentials } from '../store/authInfo/reducers';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

beforeEach(() => {
  const token = jwt.sign({
    name: 'test-user',
    role: 'Admin',
    nbf: Date.now() / 1000,
    exp: Date.now() / 1000 + (60 * 30),
    iat: Date.now() / 1000,
  }, 'secret');
  store.dispatch(setCredentials({ username: 'test-user', token, isAuthenticated: true }));
  render(<Provider store={store}><Project /></Provider>);
});

test('render Project Component', async () => {
  const p1 = await screen.findByText(/Project1/i);
  const p2 = await screen.findByText(/Project2/i);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
});

test('render finished Project Component', async () => {
  userEvent.click(screen.getByText(/Beendet/));
  const p3 = await screen.findByText(/Project3/i);
  expect(p3).toBeInTheDocument();
});

test('render create new Project Component', async () => {
  userEvent.click(screen.getByText('Neues Projekt erfassen'));

  const addProjectNameToProjectModalText = await screen.findByText(/Projektname/i);
  const addProjectInitialToProjectModalText = await screen.findByText(/Projektkürzel/i);
  const addProjectCommentToProjectModalText = await screen.findByText(/Kommentar/i);

  expect(addProjectNameToProjectModalText).toBeInTheDocument();
  expect(addProjectInitialToProjectModalText).toBeInTheDocument();
  expect(addProjectCommentToProjectModalText).toBeInTheDocument();
});

test('create new Project', async () => {
  userEvent.click(screen.getByText('Neues Projekt erfassen'));

  userEvent.type(screen.getByLabelText(/Projektname/), 'test-project');
  userEvent.type(screen.getByLabelText(/Projektkürzel/), 't2');
  userEvent.type(screen.getByLabelText(/Kommentar/), 'test-comment');

  userEvent.click(screen.getByText('Speichern'));

  const testProjectName = await screen.findByText(/test-project/);
  const testProjectInitial = await screen.findByText('t2');
  const testProjectComment = await screen.findByText(/test-comment/);

  expect(testProjectName).toBeInTheDocument();
  expect(testProjectInitial).toBeInTheDocument();
  expect(testProjectComment).toBeInTheDocument();
});

test('render add User Component', async () => {
  const buttons = await screen.findAllByTestId('addProjectButton');
  userEvent.click(buttons[0]);

  const addUserToProjectModalText = await screen.findByText(/Mitarbeiterverwaltung project1/i);
  const contributor = await screen.findByText(/tu/i);
  expect(addUserToProjectModalText).toBeInTheDocument();
  expect(contributor).toBeInTheDocument();
});

test('remove user from project', async () => {
  const buttons = await screen.findAllByTestId('addProjectButton');
  userEvent.click(buttons[0]);
  const deleteContributor = await screen.findByTestId('deleteContributorButton');
  userEvent.click(deleteContributor);
  await waitFor(() => {
    expect(screen.queryByText('tu')).not.toBeInTheDocument();
  });
});

test('add User to Project', async () => {
  const buttons = await screen.findAllByTestId('addProjectButton');
  userEvent.click(buttons[0]);
  userEvent.click(await screen.findByLabelText('Open'));
  userEvent.click(await screen.findByText('tu2'));
  const testUserNameInProject = await screen.findByText('tu2');
  expect(testUserNameInProject).toBeInTheDocument();
});

test('search project project1', async () => {
  const searchbar = await screen.findByLabelText('search-input');
  userEvent.type(searchbar, 'project1');
  const project1 = await screen.findByText('project1');

  expect(project1).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText('project2')).not.toBeInTheDocument();
  });
});

test('render edit Project Component', async () => {
  const buttons = await screen.findAllByTestId('editProjectButton');
  userEvent.click(buttons[0]);

  const addUserToProjectModalText = await screen.findByText(/Projektname/i);
  const contributor = await screen.findByText(/project1/i);
  expect(addUserToProjectModalText).toBeInTheDocument();
  expect(contributor).toBeInTheDocument();
});

test('edit Project', async () => {
  const buttons = await screen.findAllByTestId('editProjectButton');
  userEvent.click(buttons[0]);

  userEvent.type(screen.getByLabelText(/Projektname/), '-edit');
  userEvent.type(screen.getByLabelText(/Projektkürzel/), '-edit');
  userEvent.type(screen.getByLabelText(/Kommentar/), '-edit');

  userEvent.click(screen.getByText('Speichern'));

  const testProjectName = await screen.findByText(/project1-edit/);
  const testProjectInitial = await screen.findByText('p1-edit');
  const testProjectComment = await screen.findByText(/p1 dsc-edit/);

  expect(testProjectName).toBeInTheDocument();
  expect(testProjectInitial).toBeInTheDocument();
  expect(testProjectComment).toBeInTheDocument();
});

test('render delete Project Component', async () => {
  const buttons = await screen.findAllByTestId('deleteProjectButton');
  userEvent.click(buttons[0]);

  const deleteProjectModalText = await screen.findByText(/Projekt beenden/i);
  expect(deleteProjectModalText).toBeInTheDocument();
});

test('delete Project', async () => {
  const buttons = await screen.findAllByTestId('deleteProjectButton');
  userEvent.click(buttons[0]);

  userEvent.click(screen.getByText('Löschen'));

  await waitFor(() => {
    expect(screen.queryByText(/project1/i)).not.toBeInTheDocument();
  });

  userEvent.click(buttons[0]);
  const deleteProjectModalText = await screen.findByText(/Projekt beenden/i);
  expect(deleteProjectModalText).toBeInTheDocument();
});

test('render show project time modal', async () => {
  const buttons = await screen.findAllByTestId('showTimeButton');
  userEvent.click(buttons[0]);
  const projectTimeModal = await screen.findByText('Projektübersicht');
  expect(projectTimeModal).toBeInTheDocument();
});
