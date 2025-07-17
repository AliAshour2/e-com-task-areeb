import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Product } from '../../models/card.model';
import { API_ENDPOINTS, BaseUrlFake } from '../../environment/contants';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LoadingService } from '../../shared/services/loading.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) { }

  getProducts(): Observable<Product[]> {
    this.loadingService.setLoading('products', true);
    return this.http.get<Product[]>(`${BaseUrlFake}${API_ENDPOINTS.PRODUCTS.BASE}`)
      .pipe(
        map(products => {
          this.loadingService.setLoading('products', false);
          return products;
        }),
        catchError(error => {
          this.loadingService.setLoading('products', false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  };


  getProduct(id: string): Observable<Product> {
    this.loadingService.setLoading(`product-${id}`, true);
    return this.http.get<Product>(`${BaseUrlFake}${API_ENDPOINTS.PRODUCTS.SINGLE(id)}`)
      .pipe(
        map(product => {
          this.loadingService.setLoading(`product-${id}`, false);
          return product;
        }),
        catchError(error => {
          this.loadingService.setLoading(`product-${id}`, false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    this.loadingService.setLoading(`category-${category}`, true);
    return this.http.get<Product[]>(`${BaseUrlFake}${API_ENDPOINTS.PRODUCTS.CATEGORY(category)}`)
      .pipe(
        map(products => {
          this.loadingService.setLoading(`category-${category}`, false);
          return products;
        }),
        catchError(error => {
          this.loadingService.setLoading(`category-${category}`, false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${BaseUrlFake}${API_ENDPOINTS.PRODUCTS.CATEGORIES}`)
      .pipe(
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

}
