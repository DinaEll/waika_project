import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getUser } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';
import { PageInitContext } from '@/shared/types/initPageTypes';

export const fetchUser = createAsyncThunk<UserResponse, PageInitContext>(
  'user/fetchUser',
  async (ctx: PageInitContext, { rejectWithValue }) => {
    try {
      return await getUser(ctx);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      return rejectWithValue(e);
    }
  },
);
