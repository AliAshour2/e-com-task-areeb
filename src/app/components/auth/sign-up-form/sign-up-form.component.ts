import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SignUpData } from '../../../models/auth.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
  standalone: true
})
export class SignUpFormComponent {

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');


  constructor(private authService: AuthService) {

  }

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    ]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]),
  }, { validators: this.checkPasswords });

  checkPasswords(control: AbstractControl) {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { notSame: true };
  }




  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');



    const signupData: SignUpData = {
      name: this.signupForm.value.name ?? '',
      email: this.signupForm.value.email ?? '',
      password: this.signupForm.value.password ?? '',
      rePassword: this.signupForm.value.rePassword ?? '',
      phone: this.signupForm.value.phone ?? ''
    };


    this.authService.signup(signupData).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        localStorage.setItem('token', response.token)
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.message || 'Signup failed. Please try again.');
      }
    })
  }
}
