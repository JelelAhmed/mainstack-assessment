export interface HookState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
