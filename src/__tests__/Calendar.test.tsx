import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Calendar from '../components/Calendar';
import store from '../store/store';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<Provider store={store}><Calendar /></Provider>);
  const linkElement = screen.getByText(/Heute/i);
  expect(linkElement).toBeInTheDocument();
});
