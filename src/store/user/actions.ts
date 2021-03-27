import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './types';

export interface APIError {
  errorMessage: string
}

export const fetchUserById = createAsyncThunk<
User,
number,
{ rejectValue: APIError }>(
  'user/fetchById',
  // Declare the type your function argument here:
  async (userId: number, thunkApi) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    // Inferred return type: Promise<User>
    if (!response.ok) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue((await response.json()) as APIError);
    }
    const apiUser = (await response.json()).data;
    const user = {
      id: apiUser.id,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
    } as User;
    return user;
  },
);

export const updateUser = createAsyncThunk<
User,
User,
{ rejectValue: APIError }>(
  'user/update',
  // Declare the type your function argument here:
  async (oldUser: User, thunkApi) => {
    const response = await fetch(`https://reqres.in/api/users/${oldUser.id + 1}`);
    // Inferred return type: Promise<User>
    if (!response.ok) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue((await response.json()) as APIError);
    }
    const apiUser = (await response.json()).data;
    const user = {
      id: apiUser.id,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
    } as User;
    return user;
  },
);
