import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, SignInData, SignUpData } from '../../models/auth.model';
import { Observable, tap } from 'rxjs';
import { SingInEndPoint, SignUpEndPoint } from '../../environment/contants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(userData: SignInData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SingInEndPoint, userData);
  }

  signup(userData: SignUpData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SignUpEndPoint, userData);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}