import { Component } from '@angular/core';
import { Product } from '../../models/card.model';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CardSkeletonComponent } from "../../shared/components/skeletons/card-skeleton/card-skeleton.component";

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, CardSkeletonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone : true,
})
export class ProductsComponent {
    products: Product[]= [];
    isLoading = true ;
    error: string | null = null; 


    constructor(private productsService : ProductsService ){}


    ngOnInit():void {
      this.isLoading = true ;
      this.error=null;

      this.productsService.getProducts().subscribe({
        next :(products)=>{
          this.products =products;
          this.isLoading = false; 
        }, 
        error :(err)=>{
          this.error = 'Failed to load products. Please try again later.';
          this.isLoading = false;
          console.error(err);
        }
      })
    }
}
