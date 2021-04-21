import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Project from '../pages/Projects';
import store from '../store/store';

test('render Project Component', () => {
  render(<Provider store={store}><Project /></Provider>);
  const linkElement = screen.getByText(/Projects/i);
  expect(linkElement).toBeInTheDocument();
});
