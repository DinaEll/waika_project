import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '@/shared/interfaces';
import { StoreState } from '@/shared/store/types';
import { fetchUser } from '@/shared/store/user/user.action';

const initialState: StoreState<UserResponse | undefined> = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.avatar = action.payload;
      }
    },
    clearState: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
