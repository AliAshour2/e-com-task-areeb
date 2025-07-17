import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  showError(message: string) {
    this.toast.set({ message, type: 'error' });
    setTimeout(() => this.clear(), 3000);
  }

  showSuccess(message: string) {
    this.toast.set({ message, type: 'success' });
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.toast.set({ message: '', type: null });
  }
} 