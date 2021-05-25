import {
  configureStore, combineReducers, Action,
  isRejected,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api as dashboardApi } from '../service/dashboard.api';
import { api as authApi } from '../service/auth.api';
import { api as timeTrackApi } from '../service/timeTrack.api';
import authInfoReducer, { clearUser } from './authInfo/reducers';

/**
 * Centralized rtk Query Error Logger Middleware
 */
const rtkQueryErrorLogger = () => (next: Function) => (action: Action) => {
  // Queries which are in the cache get aborted and needed to be filtered.
  if (isRejected(action) && action.error.message !== 'Aborted due to condition callback returning false.') {
    toast.error(action.error.message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return next(action);
};

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
    .concat(
      dashboardApi.middleware,
      authApi.middleware,
      timeTrackApi.middleware,
      rtkQueryErrorLogger,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
