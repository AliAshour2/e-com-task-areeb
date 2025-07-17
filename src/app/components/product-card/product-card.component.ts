import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../models/card.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { HoverDirective } from '../../shared/directives/hover/hover.directive';
import { CartService } from '../../services/cart/cart.service';
import { ModalComponent } from '../../shared/components/modal/modal/modal.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { AddToCartButtonComponent } from "../../shared/components/add-to-cart-button/add-to-cart-button.component";
import { RoundedRatingPipe } from '../../pipes/rounded-rating/rounded-rating.pipe';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CurrencyPipe, TruncatePipe, HoverDirective, ModalComponent, ProductDetailComponent, AddToCartButtonComponent, RoundedRatingPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input<Product>();

  isModalOpen = signal<boolean>(false);

  constructor(private cartService: CartService, private router: Router) { }
  private AuthService = inject(AuthService);
  private toast = inject(ToastService)
  addToCart() {
    if(!this.AuthService.isLoggedIn()){
      this.toast.showError("You are not logged in")
      this.router.navigate(['/sign-in-page']);
      return;
    }
    this.cartService.addToCart(this.product()!);
  }

  openProductModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  goToDetails(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.product()) {
      this.router.navigate(['/product', this.product()!.id]);
    }
  }
}
