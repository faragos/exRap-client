import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import { api as dashboardApi } from '../service/dashboard.api';
import { api as authApi } from '../service/auth.api';

const rootReducer = combineReducers({
  user: userReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

// @ts-ignore
export type RootState = ReturnType;

export default rootReducer;
