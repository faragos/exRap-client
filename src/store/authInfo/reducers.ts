import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfo } from './types';

const initialState: AuthInfo = {
  username: '',
  token: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<AuthInfo>) => {
      state.username = username;
      state.token = token;
      state.isAuthenticated = true;
      sessionStorage.setItem('token', token);
    },
    clearUser: () => {
      sessionStorage.clear();
    },
  },
});

export const {
  setCredentials,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
