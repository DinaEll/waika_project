import { getUser } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';
import { AppDispatch } from '@/shared/store/store';
import { userSlice } from '@/shared/store/user/user.slice';

export class UserAction {
  public getUser() {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(userSlice.actions.fetching());
        const data = await getUser();
        dispatch(userSlice.actions.setUser(data));
        dispatch(userSlice.actions.fetchingSuccess());
        return data;
      } catch (e) {
        dispatch(userSlice.actions.fetchingError(e));
        console.error(e);
        return null;
      }
    };
  }

  public setUser(user: UserResponse) {
    return (dispatch: AppDispatch) => {
      dispatch(userSlice.actions.setUser(user));
    };
  }
}

export const userAction = new UserAction();
