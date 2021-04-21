import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TimeTracking from '../pages/TimeTracking';

afterEach(cleanup);

test('renders without crashing', () => {
  render(<TimeTracking />);
  const linkElement = screen.getByText(/Heute/i);
  expect(linkElement).toBeInTheDocument();
});
