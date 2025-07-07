import {
  Component,
  computed,
  EventEmitter,
  input,
  model,
  Output,
  output,
  signal,
} from '@angular/core';
import { MenuItem } from '../../models/menuItem.model';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { HomeIconComponent } from '../../icons/home-icon/home-icon.component';
import { ShopIconComponent } from '../../icons/shop-icon/shop-icon.component';
import { ContactIconComponent } from '../../icons/contact-icon/contact-icon.component';
import { BlogIconComponent } from '../../icons/blog-icon/blog-icon.component';
import { AboutIconComponent } from '../../icons/about-icon/about-icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    HomeIconComponent,
    ShopIconComponent,
    ContactIconComponent,
    BlogIconComponent,
    AboutIconComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Angular 19 signal inputs
  activeMenu = input<string>('shop');

  // Angular 19 signal outputs
  menuChange = output<string>();

  // Angular 19 two-way binding with model
  collapsed = model<boolean>(false);

  // Internal state using signals
  private readonly _isCollapsed = signal(false);

  // Computed properties
  readonly isCollapsed = computed(() => this._isCollapsed());

  readonly sidebarClasses = computed(() => ({
    'w-16': this.isCollapsed(),
    'w-64': !this.isCollapsed(),
    'md:w-52': !this.isCollapsed(),
    'sm:w-16': true,
  }));

  readonly menuItems = signal<MenuItem[]>([
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'shop', label: 'Shop', icon: '🛍️' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️', badge: 3 },
    { id: 'cart', label: 'Cart', icon: '🛒', badge: 2 },
  ]);

  setActiveMenu(menu: string) {
    this.menuChange.emit(menu);
  }

  toggleSidebar() {
    this._isCollapsed.update((collapsed) => !collapsed);
    this.collapsed.set(this._isCollapsed());
  }

  getMenuItemClasses(item: MenuItem) {
    return {
      'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg':
        this.activeMenu() === item.id,
      'bg-slate-700': this.activeMenu() !== item.id,
    };
  }

  // Angular 19 trackBy function for better performance
  trackByMenuItem(index: number, item: MenuItem): string {
    return item.id;
  }
}
