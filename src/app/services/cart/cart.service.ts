import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/card.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  readonly cartItems$ = this.cartItems.asReadonly();
  readonly total$ = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const index = currentItems.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      // Increment quantity
      const updated = [...currentItems];
      updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems();
    const index = currentItems.findIndex(item => item.product.id === productId);
    if (index > -1) {
      const updated = [...currentItems];
      if (updated[index].quantity > 1) {
        updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
        this.cartItems.set(updated);
      } else {
        this.cartItems.set(updated.filter(item => item.product.id !== productId));
      }
    }
  }

  removeAllOfProduct(productId: number): void {
    this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }
}
