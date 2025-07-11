import { Component, Input } from '@angular/core';
import { ShopCardComponent } from '../../components/shop-card/shop-card.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 
import { SearchService } from '../../shared/services/search/search.service';
@Component({
  selector: 'app-shop',
  imports: [ShopCardComponent ,FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  searchQuery = '';
  // @Input() searchQuery = '';
  selectedSort = 'default';
  selectedSize = 'all';

  

  products = [
    {
      image : "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Elegant Summer Dress',
      category: 'Clothing',
      size: 'M',
      price: 79.99,
      description: 'Light and breezy dress perfect for summer outings.',
      status: 'Not-Contacted',
    },
    {
      image : "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Casual Denim Jacket',
      category: 'Outerwear',
      size: 'L',
      price: 59.99,
      description: 'Timeless denim jacket for a stylish layered look.',
      status: 'Not-Contacted',
    },
    { image : "https://images.unsplash.com/photo-1638786023988-d27bed11e076?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Classic Leather Boots',
      category: 'Footwear',
      size: 'M',
      price: 129.99,
      description: 'Sturdy boots crafted from premium leather.',
      status: 'Not-Contacted',
    },
    { image : "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Sporty Running Shoes',
      category: 'Shoes',
      size: 'S',
      price: 89.99,
      description: 'High-performance shoes for active lifestyles.',
      status: 'Not-Contacted',
    },
    { image : "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Cozy Knit Sweater',
      category: 'Sweaters',
      size: 'L',
      price: 49.99,
      description: 'Stay warm with this soft and cozy knitwear.',
      status: 'Not-Contacted',
    },
    { image : "https://images.unsplash.com/photo-1638786023988-d27bed11e076?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: 'Stylish Handbag',
      category: 'Software',
      size: 'One Size',
      price: 69.99,
      description: 'Elegant handbag to complement any outfit.',
      status: 'Not-Contacted',
    },
  ];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.currentSearchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }


  onContact(product: any) {
    const found = this.products.find(p => p.name === product.name);
    if (found) {
      found.status = found.status === 'Contacted' ? 'Not-Contacted' : 'Contacted';
    }
  }

  get filteredProducts() {
    let filtered = [...this.products];

    if (this.selectedSize !== 'all') {
      filtered = filtered.filter((p) => p.size === this.selectedSize);
    }

    if (this.selectedSort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }

    return filtered;
  }
}
