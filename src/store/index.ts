import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user/reducers';
// @ts-ignore
export type RootState = ReturnType;

const index = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof index.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default index;
