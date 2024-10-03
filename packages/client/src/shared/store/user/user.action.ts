import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { PageInitContext } from '@/app/router/model/routes';
import { getUser } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const fetchUser = createAsyncThunk<UserResponse, PageInitContext>(
  'user/fetchUser',
  async (ctx: PageInitContext, { rejectWithValue }) => {
    console.log('fetchUserThunk', ctx);

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
