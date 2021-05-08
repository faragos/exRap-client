import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import NotFound from '../pages/NotFound';
import store from '../store/store';

beforeEach(() => {
  render(<Provider store={store}><NotFound /></Provider>);
});

test('render App Component', async () => {
  expect(await screen.findByText(/404/i)).toBeInTheDocument();
});
