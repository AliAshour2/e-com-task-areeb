import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center" [class]="containerClass()">
      <div 
        class="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
        [style.width.px]="size()"
        [style.height.px]="size()"
      ></div>
      @if (message()) {
        <span class="ml-2 text-sm text-gray-600">{{ message() }}</span>
      }
    </div>
  `
})
export class LoadingSpinnerComponent {
  size = input<number>(24);
  message = input<string>('');
  containerClass = input<string>('p-4');
}