import { Component, computed, signal } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartItems;
  total;

  constructor(public cartService: CartService) {
    this.cartItems = this.cartService.cartItems$;
    this.total = this.cartService.total$;
  }
}
