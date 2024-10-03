//packages/client/src/hooks/usePage.ts

import { useEffect } from 'react';
import { PageInitArgs } from '@/app/router/model/routes';
import { useAppDispatch } from '../store/hooks';
import { useStore } from '../store/store';

interface PageProps {
  initPage: (data: PageInitArgs) => Promise<unknown>;
}

// const getCookie = (name: string) => {
//   console.log(document.cookie);
//   const matches = new RegExp(
//     '(?:^|; )' +
//       // eslint-disable-next-line
//       name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
//       '=([^;]*)',
//   ).exec(document.cookie);
//   console.log(matches?.[1] != null ? decodeURIComponent(matches[1]) : undefined);

//   return matches?.[1] != null ? decodeURIComponent(matches[1]) : undefined;
// };

// const createContext = (): PageInitContext => ({
//   clientToken: getCookie('_ga'),
// });

// export const usePage = ({ initPage }: PageProps) => {
//   const dispatch = useAppDispatch();
//   const store = useStore();

//   useEffect(() => {
//     initPage({ dispatch, state: store.getState(), ctx: createContext() }).catch(
//       console.error,
//     );
//   }, []);
// };

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch();
  const store = useStore();

  useEffect(() => {
    initPage({ dispatch, state: store.getState(), ctx: '' }).catch(
      console.error,
    );
  }, [dispatch, initPage, store]);
};
