import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import { api as dashboardApi } from '../service/dashboard.api';

const rootReducer = combineReducers({
  user: userReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

// @ts-ignore
export type RootState = ReturnType;

export default rootReducer;
