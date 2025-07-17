import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpData, AuthResponse } from '../../../models/auth.model';
import { Observable, tap } from 'rxjs';
import { BaseUrlFake, SignUpEndPoint } from '../../../environment/contants';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http:HttpClient ) { }

  signup(userData: SignUpData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SignUpEndPoint, userData);
  } 
}
