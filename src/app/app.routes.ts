import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInFormComponent } from './components/auth/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'developers', component: ShopComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'sign-up-page', component: SignUpPageComponent },
    { path: 'sign-in-page', component: SignInPageComponent }
];
