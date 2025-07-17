import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { authGuardsGuard } from './shared/guards/auth-guards.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ProductResolver } from './resolvers/product.resolver';


export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products',  loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)},
    { path: 'developers', loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)},
    { path: 'cart', component: CartPageComponent },
    { path: 'sign-up-page',loadComponent : ()=> import('./pages/sign-up-page/sign-up-page.component').then(m=>m.SignUpPageComponent) },
    {
        path: 'product/:id',
        loadComponent : ()=> import('./pages/product-details-page/product-details-page.component').then(m=>m.ProductDetailsPageComponent) ,
        resolve: { product: ProductResolver }
      },
    { path: 'sign-in-page', component: SignInPageComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardsGuard] },
];
