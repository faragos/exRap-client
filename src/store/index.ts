import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
// @ts-ignore
export type RootState = ReturnType;

const index = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof index.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default index;
