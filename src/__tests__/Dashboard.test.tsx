import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import Dashboard from '../pages/Dashboard';
import store from '../store/store';
import { setCredentials } from '../store/authInfo/reducers';

test('render Dashboard Component', async () => {
  const token = jwt.sign({
    name: 'test-user',
    role: ['Admin', 'ProjectManager', 'ProjectContributor', 'SeniorManager'],
    nbf: Date.now() / 1000,
    exp: Date.now() / 1000 + (60 * 30),
    iat: Date.now() / 1000,
  }, 'secret');
  store.dispatch(setCredentials({ username: 'test-user', token, isAuthenticated: true }));
  render(<Provider store={store}><Dashboard /></Provider>);
  const linkElement = screen.getByText(/Dashboard/);
  const projectContributionComponent = await screen.findByText('Meine Projekte');
  const projectManagerComponent = await screen.findByText('Projektleitung');
  const companyOverviewComponent = await screen.findByText('Firmenübersicht');

  expect(linkElement).toBeInTheDocument();
  expect(projectContributionComponent).toBeInTheDocument();
  expect(projectManagerComponent).toBeInTheDocument();
  expect(companyOverviewComponent).toBeInTheDocument();
});
