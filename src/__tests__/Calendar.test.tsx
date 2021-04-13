import React from 'react';
import { cleanup } from '@testing-library/react';
import { render, screen } from '../test-utils/test-utils';
import Calendar from '../components/Calendar';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<Calendar />);
  expect(screen.getByText(/Heute/i)).toBeInTheDocument();
});
