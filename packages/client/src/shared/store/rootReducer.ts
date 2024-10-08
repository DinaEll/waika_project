import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '@/shared/store/user/user.slice';
import { ssrReducer } from './ssr/ssr.slice';

export const rootReducer = combineReducers({
  user: userReducer,
  ssr: ssrReducer,
});
