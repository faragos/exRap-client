import {
  configureStore, combineReducers, Action,
} from '@reduxjs/toolkit';
import { api as dashboardApi } from '../service/dashboard.api';
import { api as authApi } from '../service/auth.api';
import { api as timeTrackApi } from '../service/timeTrack.api';
import authInfoReducer, { clearUser } from './authInfo/reducers';

const appReducer = combineReducers({
  authInfo: authInfoReducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [timeTrackApi.reducerPath]: timeTrackApi.reducer,
});

const rootReducer = (state: any, action: Action<any>) => {
  if (clearUser.match(action)) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(dashboardApi.middleware, authApi.middleware, timeTrackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
