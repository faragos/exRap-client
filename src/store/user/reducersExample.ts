import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUserById, updateUser } from './actions';
import { User } from './types';

interface UserState {
  user: User;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | string | SerializedError
}

const initialState = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
  },
  error: null,
  loading: 'idle',
} as UserState;

const userSlice = createSlice({
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

export default userSlice.reducer;
