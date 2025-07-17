import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SignInData } from '../../../models/auth.model';
import { InputFieldComponent } from "../../../shared/components/input-field/input-field.component";
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-sign-in-form',
  imports: [InputFieldComponent , ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
  standalone: true
})
export class SignInFormComponent {



 
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);


  isValid = computed(() => this.signInForm.valid);



  onSubmit(): void {
    if (this.signInForm.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);


    const userData: SignInData = {
      email: this.signInForm.value.email ?? '',
      password: this.signInForm.value.password ?? ''
    };

    this.authService.signin(userData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        localStorage.setItem('token' , response.token);
        this.toast.showSuccess("Sign in success");
        
      },

      error: (error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error?.error?.message || 'Login failed');
        this.toast.showError(error?.error?.message || 'Login failed')
      }
    })
  }

}
