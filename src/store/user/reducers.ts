import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormUser } from './types';

const initialState = {
  username: '',
  password: '',
  token: '',
  isAuthenticated: false,
} as FormUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<FormUser>) => {
      state.username = username;
      state.token = token;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
