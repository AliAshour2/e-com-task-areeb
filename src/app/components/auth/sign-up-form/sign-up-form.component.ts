import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SignUpData } from '../../../models/auth.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';

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
  toast = inject(ToastService);
  private router = inject(Router);
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
    const password = group.get('password');
    const rePassword = group.get('rePassword');
  
    if (password && rePassword && password.value !== rePassword.value) {
      rePassword.setErrors({ ...rePassword.errors, notSame: true });
      return { notSame: true };
    } else {
      if (rePassword?.hasError('notSame')) {
        const errors = { ...rePassword.errors };
        delete errors['notSame'];
        if (Object.keys(errors).length === 0) {
          rePassword.setErrors(null);
        } else {
          rePassword.setErrors(errors);
        }
      }
      return null;
    }
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
        localStorage.setItem('token', response.token);
        this.toast.showSuccess("Sign up success");
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.message || 'Signup failed. Please try again.');
        this.toast.showError(error.error?.message);
      }
    })
  }
}
