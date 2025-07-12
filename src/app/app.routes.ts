import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
    {path: '' , redirectTo: '/products' , pathMatch : 'full'},
    {path : 'products' , component : ProductsComponent},
    {path : 'developers' , component : ShopComponent},
    {path : 'cart' , component : CartPageComponent},
];
