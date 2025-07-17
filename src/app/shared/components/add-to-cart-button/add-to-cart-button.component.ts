import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.css'
})
export class AddToCartButtonComponent {
  @Input() label = 'Add To Cart';
  @Input() disabled = false;
  @Output() addToCard = new EventEmitter<Event>();

  onClick(event: Event) {
    event.stopPropagation();
    this.addToCard.emit(event);
  }
}
