import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Product } from '../../models/card.model';
import { API_ENDPOINTS, BaseUrl } from '../../environment/contants';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LoadingService } from '../../shared/services/loading.service';
import { RouteApiResponse } from '../../models/api.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private loadingService: LoadingService
  ) { }

  private transformProduct(product: any): Product {
    return {
      id: product.id || product._id,
      title: product.title,
      price: product.priceAfterDiscount || product.price,
      priceAfterDiscount: product.priceAfterDiscount,
      description: product.description,
      category: product.category?.name || product.category,
      image: product.imageCover || product.image,
      imageCover: product.imageCover,
      images: product.images,
      brand: product.brand,
      subcategory: product.subcategory,
      quantity: product.quantity,
      sold: product.sold,
      rating: {
        rate: product.ratingsAverage || product.rating?.rate || 0,
        count: product.ratingsQuantity || product.rating?.count || 0
      },
      ratingsAverage: product.ratingsAverage,
      ratingsQuantity: product.ratingsQuantity,
      slug: product.slug,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }
  getProducts(): Observable<Product[]> {
    this.loadingService.setLoading('products', true);
    return this.http.get<RouteApiResponse<any>>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.BASE}`)
      .pipe(
        map(response => {
          this.loadingService.setLoading('products', false);
          return response.data.map(product => this.transformProduct(product));
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
    return this.http.get<{ data: any }>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.SINGLE(id)}`)
      .pipe(
        map(response => {
          this.loadingService.setLoading(`product-${id}`, false);
          return this.transformProduct(response.data);
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
    return this.http.get<RouteApiResponse<any>>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.CATEGORY(category)}`)
      .pipe(
        map(response => {
          this.loadingService.setLoading(`category-${category}`, false);
          return response.data.map(product => this.transformProduct(product));
        }),
        catchError(error => {
          this.loadingService.setLoading(`category-${category}`, false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<RouteApiResponse<any>>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.CATEGORIES}`)
      .pipe(
        map(response => response.data.map(cat => cat.name)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    this.loadingService.setLoading('search', true);
    return this.http.get<RouteApiResponse<any>>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.SEARCH(keyword)}`)
      .pipe(
        map(response => {
          this.loadingService.setLoading('search', false);
          return response.data.map(product => this.transformProduct(product));
        }),
        catchError(error => {
          this.loadingService.setLoading('search', false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    this.loadingService.setLoading(`brand-${brand}`, true);
    return this.http.get<RouteApiResponse<any>>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.BRAND(brand)}`)
      .pipe(
        map(response => {
          this.loadingService.setLoading(`brand-${brand}`, false);
          return response.data.map(product => this.transformProduct(product));
        }),
        catchError(error => {
          this.loadingService.setLoading(`brand-${brand}`, false);
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }
}
