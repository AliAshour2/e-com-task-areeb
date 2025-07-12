import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../models/card.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS, BaseUrl } from '../../environment/contants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http:HttpClient) { }

 private cartItemsSubject = new BehaviorSubject<Product[]>([]);
 cartItems$ = this.cartItemsSubject.asObservable();


  


}
