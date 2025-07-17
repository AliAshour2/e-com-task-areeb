import { Component, signal, OnInit, ChangeDetectionStrategy, computed } from '@angular/core';
import { Product } from '../../models/card.model';
import { ProductsService } from '../../services/products/products.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CardSkeletonComponent } from "../../shared/components/skeletons/card-skeleton/card-skeleton.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LoadingService } from '../../shared/services/loading.service';

import { SelectfilterComponent } from '../../shared/components/select/selectfilter/selectfilter.component';
import { CategoryFilterPipe } from '../../pipes/category-filter/category-filter.pipe';
import { PriceFilterPipe } from '../../pipes/price-filter/price-filter.pipe';
import { RatingFilterPipe } from '../../pipes/rating-filter/rating-filter.pipe';
import { SortFilterPipe } from '../../pipes/sort-filter/sort-filter.pipe';
import { ProductsFilterService } from '../../services/products-filter/products-filter.service';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    CardSkeletonComponent,
    LoadingSpinnerComponent,
    CategoryFilterPipe,
    PriceFilterPipe,
    RatingFilterPipe,
    SortFilterPipe,
    SelectfilterComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone : true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
    products = signal<Product[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    selectedCategory = 'all';
    selectedPriceRange = 'all';
    selectedMinRating = 'all';
    selectedSort = 'default';

    categoryOptions = [
      { value: 'all', label: 'All Categories' },
      { value: "men's clothing", label: "Men's Clothing" },
      { value: "women's clothing", label: "Women's Clothing" },
      { value: 'jewelery', label: 'Jewelery' },
      { value: 'electronics', label: 'Electronics' }
    ];
    priceOptions = [
      { value: 'all', label: 'All Prices' },
      { value: '0-25', label: '$0 - $25' },
      { value: '25-50', label: '$25 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100-1000', label: '$100+' }
    ];
    ratingOptions = [
      { value: 'all', label: 'All Ratings' },
      { value: '4', label: '4 stars & up' },
      { value: '3', label: '3 stars & up' },
      { value: '2', label: '2 stars & up' },
      { value: '1', label: '1 star & up' }
    ];
    sortOptions = [
      { value: 'default', label: 'Default' },
      { value: 'priceAsc', label: 'Price: Low to High' },
      { value: 'priceDesc', label: 'Price: High to Low' },
      { value: 'ratingDesc', label: 'Rating: High to Low' },
      { value: 'ratingAsc', label: 'Rating: Low to High' }
    ];

    // Computed properties for better performance
    filteredProducts = computed(() => {
      let filtered = [...this.products()];

      // Apply filters
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === this.selectedCategory);
      }

      if (this.selectedPriceRange !== 'all') {
        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= (min || 0) && p.price <= (max || Infinity));
      }

      if (this.selectedMinRating !== 'all') {
        filtered = filtered.filter(p => p.rating.rate >= Number(this.selectedMinRating));
      }

      // Apply sorting
      if (this.selectedSort !== 'default') {
        filtered.sort((a, b) => {
          switch (this.selectedSort) {
            case 'priceAsc': return a.price - b.price;
            case 'priceDesc': return b.price - a.price;
            case 'ratingAsc': return a.rating.rate - b.rating.rate;
            case 'ratingDesc': return b.rating.rate - a.rating.rate;
            default: return 0;
          }
        });
      }

      return filtered;
    });
    constructor(
      private productsService : ProductsService,
      private filterService: ProductsFilterService,
      private errorHandler: ErrorHandlerService,
      public loadingService: LoadingService
    ){}

    ngOnInit():void {
      this.loadProducts();
    }

    private loadProducts(): void {
      this.isLoading.set(true) 
      this.error.set(null);

      this.productsService.getProducts().subscribe({
        next :(products)=>{
          this.products.set(products);
          this.isLoading.set(false) 
        }, 
        error :(err)=>{
          this.error.set(err.message || 'Failed to load products. Please try again later.');
          this.isLoading.set(false);
        }
      })
    }

    retryLoadProducts(): void {
      this.loadProducts();
    }

    onCategoryChange(category: string) {
      this.selectedCategory = category;
      this.filterService.setCategory(category);
    }
    onPriceRangeChange(range: string) {
      this.selectedPriceRange = range;
      this.filterService.setPriceRange(range);
    }
    onMinRatingChange(rating: string) {
      this.selectedMinRating = rating;
      this.filterService.setMinRating(rating);
    }
    onSortChange(sort: string) {
      this.selectedSort = sort;
      this.filterService.setSort(sort);
    }
}
