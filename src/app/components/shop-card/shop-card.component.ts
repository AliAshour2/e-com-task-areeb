import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  imports: [],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.css'
})
export class ShopCardComponent {
  @Input() product: any;
}
