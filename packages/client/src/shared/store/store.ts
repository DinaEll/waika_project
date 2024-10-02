import { configureStore } from '@reduxjs/toolkit';
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
