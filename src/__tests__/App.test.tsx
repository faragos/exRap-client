import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store/store';

test('render App Component', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/ExRap/i);
  expect(linkElement).toBeInTheDocument();
});
