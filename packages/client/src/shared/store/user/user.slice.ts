import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '@/shared/interfaces';
import { IState } from '@/shared/store/types';

const initialState: IState<UserResponse> = {
  data: {} as UserResponse,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetching: (state) => {
      state.isLoading = true;
    },

    fetchingError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchingSuccess: (state) => {
      state.error = null;
      state.isLoading = false;
    },

    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
    },

    setAvatar: (state, action: PayloadAction<string>) => {
      state.data.avatar = action.payload;
    },

    clearState: (state) => {
      state.data = initialState.data;
    },
  },
});

export const userReducer = userSlice.reducer;
