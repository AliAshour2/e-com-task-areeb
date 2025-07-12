import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/card.model';
import { API_ENDPOINTS, BaseUrl } from '../../environment/contants';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  constructor(private http:HttpClient){}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.BASE}`);
  };


  getProduct(id : string): Observable<Product>{
      return this.http.get<Product>(`${BaseUrl}${API_ENDPOINTS.PRODUCTS.SINGLE(id)}`)
  }
  

  
}
