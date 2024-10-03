import { configureStore } from '@reduxjs/toolkit';
import { useStore as useStoreBase } from 'react-redux';
import { rootReducer } from '@/shared/store/rootReducer';

declare global {
  interface Window {
    APP_INITIAL_STATE: Reducer;
  }
}
export type Reducer = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useStore: () => typeof store = useStoreBase;
