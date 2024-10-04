import { fetchUser } from '@/shared/store/user/user.action';
import { selectUser } from '@/shared/store/user/user.slice';
import { InitPage } from '@/shared/types/initPageTypes';

export const initPageBase: InitPage = async ({ dispatch, state, ctx }) => {
  console.log('initPageBase', ctx);
  if (!selectUser(state).data) {
    await dispatch(fetchUser(ctx));
  }
};
