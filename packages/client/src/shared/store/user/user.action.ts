import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '@/shared/api';
import type { UserResponse } from '@/shared/interfaces';

export const fetchUser = createAsyncThunk<
  UserResponse,
  { signal?: AbortSignal } | undefined
>('user/fetchUser', async ({ signal } = {}, { rejectWithValue }) => {
  try {
    return await getUser(signal);
  } catch (e) {
    return rejectWithValue(e);
  }
});
