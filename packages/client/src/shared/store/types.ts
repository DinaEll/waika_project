export interface IState<T> {
  isLoading: boolean;
  error: unknown;
  data: T;
}
