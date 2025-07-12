import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<Product[]>([]);

  readonly cartItems$ = this.cartItems.asReadonly();
  readonly total$ = computed(() => this.cartItems().reduce((sum, item) => sum + item.price, 0));

  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existing = currentItems.find(item => item.id === product.id);
    if (!existing) {
      this.cartItems.set([...currentItems, product]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.set(this.cartItems().filter(item => item.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  getCartItems(): Product[] {
    return this.cartItems();
  }
}
