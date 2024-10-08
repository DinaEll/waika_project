import { fetchUser } from '@/shared/store/user/user.action';
import { userSelector } from '@/shared/store/user/user.selector';
import type { InitPage } from '@/shared/types';

export const initPageBase: InitPage = async ({ dispatch, state, ctx }) => {
  if (!userSelector(state)) {
    await dispatch(fetchUser({ ctx }));
  }
};
