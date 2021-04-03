import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import userReducerExample from './user/reducersExample';
import { api as dashboardApi } from '../service/dashboard.api';
// eslint-disable-next-line import/no-cycle
import { api as authApi } from '../service/auth.api';

const rootReducer = combineReducers({
  user: userReducer,
  userExample: userReducerExample,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

// @ts-ignore
export type RootState = ReturnType;

export default rootReducer;
