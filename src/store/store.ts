import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api as dashboardApi } from '../service/dashboard.api';
import { api as authApi } from '../service/auth.api';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(dashboardApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
