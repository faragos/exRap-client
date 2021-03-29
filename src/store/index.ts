import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { api as dashboardApi } from '../service/dashboards.api';
// @ts-ignore
export type RootState = ReturnType;

const index = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dashboardApi.middleware),
});

export type AppDispatch = typeof index.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default index;
