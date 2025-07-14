import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../components/auth/signup/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-page',
  imports: [SignUpFormComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

}
