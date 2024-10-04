//packages/client/src/hooks/usePage.ts

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
} from '../store/ssr/ssr.slice';
import { useStore } from '../store/store';
import { PageInitArgs } from '../types/initPageTypes';

interface PageProps {
  initPage: (data: PageInitArgs) => Promise<unknown>;
}

export const usePage = ({ initPage }: PageProps) => {
  console.log('usePage');

  const dispatch = useAppDispatch();
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer,
  );
  const store = useStore();

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false));
      return;
    }
    initPage({ dispatch, state: store.getState(), ctx: document.cookie }).catch(
      console.error,
    );
  }, []);
};
