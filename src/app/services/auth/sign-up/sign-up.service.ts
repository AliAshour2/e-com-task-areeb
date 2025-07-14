import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpData, SignUpResponse } from '../../../models/auth.model';
import { Observable, tap } from 'rxjs';
import { BaseUrlFake, SignUpEndPoint } from '../../../environment/contants';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http:HttpClient ) { }

  signup(userData: SignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SignUpEndPoint, userData).pipe(
      tap(response => {
        if (response.token) {
         localStorage.setItem('token',response.token)
        }
      })
    );
  } 
}
