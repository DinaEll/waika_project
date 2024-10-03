import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getUser } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const fetchUser = createAsyncThunk<UserResponse, void>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser();
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      return rejectWithValue(e);
    }
  },
);
