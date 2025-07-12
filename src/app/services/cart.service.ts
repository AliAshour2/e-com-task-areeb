import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

const BASE_URL = 'https://fakestoreapi.com';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  // Get all carts
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${BASE_URL}/carts`);
  }

  // Get a single cart by id
  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${BASE_URL}/carts/${id}`);
  }

  // Add a new cart (POST)
  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${BASE_URL}/carts`, cart);
  }

  // Update a cart (PUT)
  updateCart(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${BASE_URL}/carts/${id}`, cart);
  }

  // Delete a cart
  deleteCart(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/carts/${id}`);
  }
} 