import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TimeTracking from '../pages/TimeTracking';
import store from '../store/store';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<Provider store={store}><TimeTracking /></Provider>);
  const linkElement = screen.getByText(/Heute/i);
  expect(linkElement).toBeInTheDocument();
});
