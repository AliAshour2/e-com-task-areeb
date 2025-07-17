import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../../models/card.model';
import { ToastService } from '../../shared/services/toast.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private readonly STORAGE_KEY = 'cart-items';

  readonly cartItems$ = this.cartItems.asReadonly();
  readonly total$ = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );
  readonly itemCount$ = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor(private toastService: ToastService) {
    this.loadCartFromStorage();
    
    // Auto-save to localStorage when cart changes
    effect(() => {
      this.saveCartToStorage();
    });
  }

  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored);
        this.cartItems.set(items);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }

  private saveCartToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems()));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }
  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const index = currentItems.findIndex(item => item.product.id === product.id);
    
    if (index > -1) {
      // Increment quantity
      const updated = [...currentItems];
      updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
      this.cartItems.set(updated);
      this.toastService.showSuccess(`Increased ${product.title} quantity`);
    } else {
      this.cartItems.set([...currentItems, { product, quantity: 1 }]);
      this.toastService.showSuccess(`${product.title} added to cart`);
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
        this.toastService.showSuccess('Item removed from cart');
      }
    }
  }

  removeAllOfProduct(productId: number): void {
    const item = this.cartItems().find(item => item.product.id === productId);
    this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));
    if (item) {
      this.toastService.showSuccess(`${item.product.title} removed from cart`);
    }
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.toastService.showSuccess('Cart cleared');
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }

  isInCart(productId: number): boolean {
    return this.cartItems().some(item => item.product.id === productId);
  }

  getItemQuantity(productId: number): number {
    const item = this.cartItems().find(item => item.product.id === productId);
    return item?.quantity || 0;
  }
}
