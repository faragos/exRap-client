import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import store from '../store/store';

test('render Dashboard Component', () => {
  render(<Provider store={store}><Dashboard /></Provider>);
  const linkElement = screen.getByText(/Dashboard/);
  expect(linkElement).toBeInTheDocument();
});
