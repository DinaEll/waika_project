export interface StoreState<T> {
  isLoading: boolean;
  error: unknown;
  data: T;
}
