import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/card.model';
import { CartService } from '../../services/cart/cart.service';
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { RoundedRatingPipe } from '../../pipes/rounded-rating/rounded-rating.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe , TruncatePipe , RoundedRatingPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product = input<Product>();
  closeModal = output<void>();
  
  constructor(private cartService: CartService) {}
  
  addToCart() {
    this.cartService.addToCart(this.product()!);
    this.closeModal.emit();
  }

 

} 