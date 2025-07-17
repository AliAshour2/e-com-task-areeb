import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastService: ToastService) {}

  handleError(error: any): AppError {
    let appError: AppError;

    if (error instanceof HttpErrorResponse) {
      appError = this.handleHttpError(error);
    } else if (error instanceof Error) {
      appError = {
        message: error.message,
        details: error.stack
      };
    } else {
      appError = {
        message: 'An unexpected error occurred',
        details: error
      };
    }

    this.logError(appError);
    this.showUserError(appError);
    
    return appError;
  }

  private handleHttpError(error: HttpErrorResponse): AppError {
    switch (error.status) {
      case 400:
        return {
          message: error.error?.message || 'Bad request',
          code: 'BAD_REQUEST'
        };
      case 401:
        return {
          message: 'Please log in to continue',
          code: 'UNAUTHORIZED'
        };
      case 403:
        return {
          message: 'You do not have permission to perform this action',
          code: 'FORBIDDEN'
        };
      case 404:
        return {
          message: 'The requested resource was not found',
          code: 'NOT_FOUND'
        };
      case 500:
        return {
          message: 'Server error. Please try again later',
          code: 'SERVER_ERROR'
        };
      default:
        return {
          message: error.error?.message || 'Network error occurred',
          code: 'NETWORK_ERROR'
        };
    }
  }

  private logError(error: AppError): void {
    console.error('Application Error:', error);
    // In production, send to logging service
  }

  private showUserError(error: AppError): void {
    // Only show user-friendly errors
    if (!error.code || ['BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN'].includes(error.code)) {
      this.toastService.showError(error.message);
    }
  }
}