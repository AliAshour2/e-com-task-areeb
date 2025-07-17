import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStates = signal<Map<string, boolean>>(new Map());

  setLoading(key: string, loading: boolean): void {
    const currentStates = new Map(this.loadingStates());
    currentStates.set(key, loading);
    this.loadingStates.set(currentStates);
  }

  isLoading(key: string): boolean {
    return this.loadingStates().get(key) || false;
  }

  isAnyLoading(): boolean {
    return Array.from(this.loadingStates().values()).some(loading => loading);
  }

  clearLoading(key: string): void {
    const currentStates = new Map(this.loadingStates());
    currentStates.delete(key);
    this.loadingStates.set(currentStates);
  }

  clearAllLoading(): void {
    this.loadingStates.set(new Map());
  }
}