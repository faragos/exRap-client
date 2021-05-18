import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { AuthInfo } from './types';
import { JWTTokenData } from '../../types/types';

const initialState: AuthInfo = {
  username: '',
  token: '',
  roles: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }: PayloadAction<AuthInfo>) => {
      const decodedToken: JWTTokenData = jwt_decode(token);
      state.username = username;
      state.token = token;
      state.roles = decodedToken.role;
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
