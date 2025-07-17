import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  standalone : true ,
})
export class ToastComponent {
  message = input<string>('');
 
  type = input<'success' | 'error'>('success') ;


  
}
