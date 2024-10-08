import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getUser } from '@/shared/api';
import type { UserResponse } from '@/shared/interfaces';

type FetchUser = Parameters<typeof getUser>[0];

export const fetchUser = createAsyncThunk<UserResponse, FetchUser>(
  'user/fetchUser',
  async ({ signal, ctx } = {}, { rejectWithValue }) => {
    try {
      return await getUser({ signal, ctx });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      return rejectWithValue(e);
    }
  },
);
