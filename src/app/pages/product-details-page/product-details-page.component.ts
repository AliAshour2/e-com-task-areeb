import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/card.model';
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { RoundedRatingPipe } from '../../pipes/rounded-rating/rounded-rating.pipe';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,TruncatePipe,RoundedRatingPipe],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent {
  product = signal<Product | undefined>(undefined);

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.product.set(this.route.snapshot.data['product']);
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!);
    }
  }

  getString(value: string | undefined): string {
    return value ?? '';
  }
}
