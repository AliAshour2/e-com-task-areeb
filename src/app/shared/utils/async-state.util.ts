import { signal, Signal } from '@angular/core';
import { AsyncState, LoadingState } from '../../models/api.model';

export function createAsyncState<T>(initialData: T | null = null): {
  state: Signal<AsyncState<T>>;
  setLoading: () => void;
  setSuccess: (data: T) => void;
  setError: (error: string) => void;
  reset: () => void;
} {
  const state = signal<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
    state: LoadingState.IDLE
  });

  return {
    state: state.asReadonly(),
    setLoading: () => state.update(s => ({
      ...s,
      loading: true,
      error: null,
      state: LoadingState.LOADING
    })),
    setSuccess: (data: T) => state.update(s => ({
      ...s,
      data,
      loading: false,
      error: null,
      state: LoadingState.SUCCESS
    })),
    setError: (error: string) => state.update(s => ({
      ...s,
      loading: false,
      error,
      state: LoadingState.ERROR
    })),
    reset: () => state.set({
      data: initialData,
      loading: false,
      error: null,
      state: LoadingState.IDLE
    })
  };
}