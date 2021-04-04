import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import rootReducer from './rootReducer';
import { api as dashboardApi } from '../service/dashboard.api';
// eslint-disable-next-line import/no-cycle
import { api as authApi } from '../service/auth.api';

// @ts-ignore
// export type RootState = ReturnType;

const index = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(dashboardApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default index;
