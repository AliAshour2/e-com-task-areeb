import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from '../../models/card.model';
import { StatusBadgeComponent } from "../../shared/components/status-badge/status-badge.component";
import { CategoryChipComponent } from "../../shared/components/category-chip/category-chip.component";
import { MainToggleButtonComponent } from "../../shared/components/main-toggle-button/main-toggle-button.component";
import { ContactButtonComponent } from "../../shared/components/contact-button/contact-button.component";


@Component({
  selector: 'app-shop-card',
  imports: [CommonModule, StatusBadgeComponent, CategoryChipComponent, MainToggleButtonComponent, ContactButtonComponent],
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
