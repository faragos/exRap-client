import {
  render, screen, within,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import store from '../store/store';
import server from '../mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('Sidebar Tests', () => {
  beforeEach(async () => {
    render(<Provider store={store}><App /></Provider>);
    userEvent.type(await screen.findByLabelText(/Username/), 'test-user');
    userEvent.type(await screen.findByLabelText(/Password/), 'test-password');
    userEvent.click(await screen.findByText(/Login/));
  });

  afterEach(async () => {
    const nav = await screen.findByRole('navigation');
    const navLogout = await within(nav).findByText(/Ausloggen/);
    userEvent.click(navLogout);
  });

  test('render App after login', async () => {
    const nav = await screen.findByRole('navigation');
    const navDashboard = await within(nav).findByText('Mein Dashboard');
    const navTime = await within(nav).findByText('Meine Zeiterfassung');
    const navProject = await within(nav).findByText('Projekte');
    const navAdmin = await within(nav).findByText('Administration');
    const navLogout = await within(nav).findByText('Ausloggen');
    const dashboardComponent = await screen.findByText('Dashboard');

    expect(navDashboard).toBeInTheDocument();
    expect(navTime).toBeInTheDocument();
    expect(navProject).toBeInTheDocument();
    expect(navAdmin).toBeInTheDocument();
    expect(navLogout).toBeInTheDocument();
    expect(dashboardComponent).toBeInTheDocument();
  });

  test('go to Mein Dashboard', async () => {
    const nav = await screen.findByRole('navigation');
    const navDashboard = await within(nav).findByText(/Mein Dashboard/);
    userEvent.click(navDashboard);

    const dashboardComponent = await screen.findByText('Dashboard');
    expect(dashboardComponent).toBeInTheDocument();
  });

  test('go to Meine Zeiterfassung', async () => {
    const nav = await screen.findByRole('navigation');
    const navTime = await within(nav).findByText(/Meine Zeiterfassung/);
    userEvent.click(navTime);

    const timeComponent = await screen.findByText('Zeiterfassung');
    expect(timeComponent).toBeInTheDocument();
  });

  test('go to Projekte', async () => {
    const nav = await screen.findByRole('navigation');
    const navProject = await within(nav).findByText(/Projekte/);
    userEvent.click(navProject);

    const projectComponent = await screen.findByText('Projects');
    expect(projectComponent).toBeInTheDocument();
  });

  test('go to Administration', async () => {
    const nav = await screen.findByRole('navigation');
    const navAdmin = await within(nav).findByText(/Administration/);
    userEvent.click(navAdmin);

    const h1 = await screen.findByRole('heading', { level: 1 });
    const adminComponent = await within(h1).findByText(/Administration/);
    expect(adminComponent).toBeInTheDocument();
  });
});

test('Test Ausloggen', async () => {
  render(<Provider store={store}><App /></Provider>);
  userEvent.type(await screen.findByLabelText(/Username/), 'test-user');
  userEvent.type(await screen.findByLabelText(/Password/), 'test-password');
  userEvent.click(await screen.findByText(/Login/));

  const nav = await screen.findByRole('navigation');
  const navLogout = await within(nav).findByText(/Ausloggen/);
  userEvent.click(navLogout);

  const loginComponent = await screen.findByText(/Login/);
  expect(loginComponent).toBeInTheDocument();
});
