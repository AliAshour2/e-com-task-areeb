import { Component, Input } from '@angular/core';
import { Product } from '../../models/card.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { HoverDirective } from '../../shared/directives/hover/hover.directive';
import { CartService } from '../../services/cart/cart.service';
import { ModalComponent } from '../../shared/components/modal/modal/modal.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { AddToCartButtonComponent } from "../../shared/components/add-to-cart-button/add-to-cart-button.component";

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CurrencyPipe, TruncatePipe, HoverDirective, ModalComponent, ProductDetailComponent, AddToCartButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  isModalOpen = false;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  get roundedRating(): number {
    return Math.round(this.product.rating.rate);
  }

  openProductModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
