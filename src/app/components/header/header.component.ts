import { Component } from '@angular/core';
import { SearchService } from '../../shared/services/search/search.service';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery = '';

  constructor(
    private searchService: SearchService,
    public cartService: CartService,
    public authService: AuthService
  ) {}

  get cartItemsCount() {
    return this.cartService.cartItems$().length;
  }

  get isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  // goToCart() {
  //   this.router.navigate(['/cart']);
  // }


  //  // @Input() searchQuery = '';
  // @Output() searchQueryChange = new EventEmitter<string>();

  // onSearchChange(value: string) {
  //   this.searchQuery = value;
  //   this.searchQueryChange.emit(this.searchQuery);
  // }
}
