import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import { api as dashboardApi } from '../service/dashboards.api';

const rootReducer = combineReducers({
  user: userReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

// @ts-ignore
export type RootState = ReturnType;

export default rootReducer;
