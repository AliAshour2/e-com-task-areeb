import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryChipComponent } from "../common/category-chip/category-chip.component";
import { StatusBadgeComponent } from '../common/status-badge/status-badge.component';
import { ContactStatus } from '../../models/card.model';

@Component({
  selector: 'app-shop-card',
  imports: [CommonModule, CategoryChipComponent, StatusBadgeComponent],
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

  toggleContact() {
    this.status = this.status === ContactStatus.Contacted ? ContactStatus.NotContacted : ContactStatus.Contacted;
    // Optionally emit event to parent if needed
    // this.contact.emit();
  }
}
