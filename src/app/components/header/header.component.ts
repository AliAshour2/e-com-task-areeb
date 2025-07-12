import { Component } from '@angular/core';
import { SearchService } from '../../shared/services/search/search.service';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery = '';

  constructor(
    private searchService: SearchService,
    public cartService: CartService,
    private router: Router
  ) {}

  get cartItemsCount() {
    return this.cartService.cartItems$().length;
  }

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }


  //  // @Input() searchQuery = '';
  // @Output() searchQueryChange = new EventEmitter<string>();

  // onSearchChange(value: string) {
  //   this.searchQuery = value;
  //   this.searchQueryChange.emit(this.searchQuery);
  // }
}
