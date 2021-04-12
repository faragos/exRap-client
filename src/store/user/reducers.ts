import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

const initialState = {
  username: '',
  password: '',
  token: '',
  isAuthenticated: false,
} as User;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<User>) => {
      state.username = username;
      state.token = token;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';
      state.isAuthenticated = false;
      sessionStorage.clear();
    },
  },
});

export const {
  setCredentials,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
