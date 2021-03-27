import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  user: userReducer,
});

// @ts-ignore
export type RootState = ReturnType;

export default rootReducer;
