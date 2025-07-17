import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, SignInData, SignUpData } from '../../models/auth.model';
import { Observable, tap, BehaviorSubject, catchError, throwError } from 'rxjs';
import { SingInEndPoint, SignUpEndPoint } from '../../environment/contants';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
    // Check for existing token on service initialization
    this.checkAuthStatus();
  }

  signin(userData: SignInData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SingInEndPoint, userData)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  signup(userData: SignUpData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SignUpEndPoint, userData)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (error) {
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in-page']);
  }

  refreshToken(): Observable<AuthResponse> {
    // Implement refresh token logic here
    return this.http.post<AuthResponse>('/api/auth/refresh', {})
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }
}