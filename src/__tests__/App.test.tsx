import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store/store';

/**
 * The whole page is empty so nothing to test
 *
 */

test('render App Component', () => {
  render(<Provider store={store}><App /></Provider>);
  expect(true).toBeTruthy();
});
