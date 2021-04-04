import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Sidebar from '../Sidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
});

it('renders sidebar correctly', () => {
  const { getByTestId } = render(<Sidebar />);
  expect(getByTestId('buttonLogout')).toHaveTextContent('Ausloggen');
});
