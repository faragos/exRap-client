import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api as dashboardApi } from '../service/dashboard.api';
import { api as authApi } from '../service/auth.api';
import { api as timeTrackApi } from '../service/timeTrack.api';
import authInfoReducer from './authInfo/reducers';

const rootReducer = combineReducers({
  authInfo: authInfoReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [timeTrackApi.reducerPath]: timeTrackApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(dashboardApi.middleware, authApi.middleware, timeTrackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
