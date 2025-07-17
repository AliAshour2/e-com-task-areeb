import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, SignInData } from '../../../models/auth.model';
import { Observable, tap } from 'rxjs';
import { SingInEndPoint } from '../../../environment/contants';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  signin(userData: SignInData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SingInEndPoint, userData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token)
        }
      }) 
    )
  }
}
