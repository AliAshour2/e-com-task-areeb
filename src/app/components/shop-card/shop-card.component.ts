import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from '../../models/card.model';
import { StatusBadgeComponent } from "../../common/status-badge/status-badge.component";
import { CategoryChipComponent } from "../../common/category-chip/category-chip.component";
import { ContactButtonComponent } from "../../common/contact-button/contact-button.component";
import { MainToggleButtonComponent } from "../../common/main-toggle-button/main-toggle-button.component";


@Component({
  selector: 'app-shop-card',
  imports: [CommonModule, StatusBadgeComponent, CategoryChipComponent, ContactButtonComponent, MainToggleButtonComponent],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.css',
  standalone: true,
})
export class ShopCardComponent implements OnInit {
  @Input() product: any;
  @Output() contact = new EventEmitter<void>();

  status: ContactStatus = ContactStatus.NotContacted;

  ngOnInit() {
    this.status = this.product.status;
  }

  onContactStatusChange(newStatus: ContactStatus) {
    this.status = newStatus;
    this.contact.emit(); 
  }
}
