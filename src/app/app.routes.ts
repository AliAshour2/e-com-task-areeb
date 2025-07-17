import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products',  loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)},
    { path: 'developers', loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)},
    { path: 'cart', component: CartPageComponent },
    { path: 'sign-up-page',loadComponent : ()=> import('./pages/sign-up-page/sign-up-page.component').then(m=>m.SignUpPageComponent) },
    { path: 'sign-in-page', component: SignInPageComponent }
];
