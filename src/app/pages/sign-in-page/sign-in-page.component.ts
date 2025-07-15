import { Component } from '@angular/core';
import { SignInFormComponent } from "../../components/auth/sign-in-form/sign-in-form.component";

@Component({
  selector: 'app-sign-in-page',
  imports: [SignInFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

}
