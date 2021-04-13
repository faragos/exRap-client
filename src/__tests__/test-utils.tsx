import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/timeTrack/reducers';

// code from: https://redux.js.org/recipes/writing-tests#connected-components
function render(
  ui: any,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  }: any = {},
) {
  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
