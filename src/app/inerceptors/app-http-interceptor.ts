import { inject } from "@angular/core";
import { ToastService } from "../shared/services/toast.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
export const appHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown> ,next: HttpHandlerFn) : Observable<HttpEvent<unknown>> => {
    const toast = inject(ToastService);
    
    return next(req).pipe(
     
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Something went wrong';
        toast.showError(errorMessage);
        console.log(errorMessage);
        return throwError(() => error);
      }),
     
    );
  };
