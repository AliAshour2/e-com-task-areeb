import { Component, input, Input, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  standalone:true ,
})
export class InputFieldComponent {
  label =input<string>('');
  placeholder =input<string>('');
  type = input<'text' | 'email' | 'password' | 'tel'>('text');
  control=input<FormControl|undefined>(undefined);
  id =input<string>('');
  showPasswordToggle =input<boolean>(false);
  showPassword = signal(false);

  get inputType() {
    return this.showPasswordToggle() && this.type() === 'password'
      ? this.showPassword() ? 'text' : 'password'
      : this.type;
  }

  togglePasswordVisibility() {
    this.showPassword.update((prev) => !prev);
  }

  get hasError() {
    return this.control()?.invalid && (this.control()?.dirty || this.control()?.touched);
  }
 
}







// @Input() label = '';
//   @Input() placeholder = '';
//   @Input() type: 'text' | 'email' | 'password' | 'tel' = 'text';
//   @Input() control!: FormControl;
//   @Input() id = '';
//   @Input() showPasswordToggle = false;
//   showPassword = signal(false);

//   get inputType() {
//     return this.showPasswordToggle && this.type === 'password'
//       ? this.showPassword() ? 'text' : 'password'
//       : this.type;
//   }

//   togglePasswordVisibility() {
//     this.showPassword.update((prev) => !prev);
//   }

//   get hasError() {
//     return this.control?.invalid && (this.control?.dirty || this.control?.touched);
//   }
 
