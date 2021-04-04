import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
});

it('renders logout button correctly', () => {
  const { getByTestId } = render(<Sidebar />);
  expect(getByTestId('buttonLogout')).toHaveTextContent('Ausloggen');
});
