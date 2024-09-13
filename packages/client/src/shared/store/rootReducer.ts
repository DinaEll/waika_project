import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '@/shared/store/user/user.slice';

export const rootReducer = combineReducers({
  user: userReducer,
});
