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

/* export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `APIError` to `rejectValue` in `fetchUserById`,
        // the type information will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer; */
