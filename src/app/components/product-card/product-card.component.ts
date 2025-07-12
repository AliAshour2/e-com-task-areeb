import { Component, Input } from '@angular/core';
import { Product } from '../../models/card.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { HoverDirective } from '../../shared/directives/hover/hover.directive';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule  , CurrencyPipe , TruncatePipe,HoverDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product! : Product ;
}
