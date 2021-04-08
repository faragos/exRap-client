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
    logoutUser: (state) => {
      state.username = '';
      state.password = '';
      state.token = '';
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
