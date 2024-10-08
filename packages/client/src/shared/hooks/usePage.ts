import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
} from '@/shared/store/ssr/ssr.slice';
import { useStore } from '@/shared/store/store';
import { PageInitArgs } from '@/shared/types';
import { logError } from '@/shared/utils';
import { useEffectOnce } from './useEffectOnce';

interface PageProps {
  initPage: (data: PageInitArgs) => Promise<unknown>;
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch();
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer,
  );
  const store = useStore();

  useEffectOnce(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false));
      return;
    }
    initPage({ dispatch, state: store.getState(), ctx: document.cookie }).catch(
      logError,
    );
  });
};
