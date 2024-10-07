import { AppDispatch, RootState } from '../store/store';

export type InitPage = (args: PageInitArgs) => Promise<void>;
export type PageInitContext = string;

export interface PageInitArgs {
  dispatch: AppDispatch;
  state: RootState;
  ctx: PageInitContext;
}
