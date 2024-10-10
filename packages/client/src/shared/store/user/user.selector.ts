import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/shared/store/store';
import { isDefined } from '@/shared/utils';

export const isUserAuthSelector = createSelector(
  [(state: RootState) => state.user],
  (user) => {
    return isDefined(user.data);
  },
);

export const userSelector = createSelector(
  [(state: RootState) => state.user],
  (user) => {
    return user.data;
  },
);
