import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const fetchUser = createAsyncThunk<UserResponse, void>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
