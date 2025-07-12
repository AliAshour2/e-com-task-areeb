import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from '../../models/card.model';
import { StatusBadgeComponent } from "../../shared/components/status-badge/status-badge.component";
import { CategoryChipComponent } from "../../shared/components/category-chip/category-chip.component";
import { MainToggleButtonComponent } from "../../shared/components/main-toggle-button/main-toggle-button.component";
import { ContactButtonComponent } from "../../shared/components/contact-button/contact-button.component";


@Component({
  selector: 'app-developer-card',
  imports: [CommonModule, StatusBadgeComponent, CategoryChipComponent, MainToggleButtonComponent, ContactButtonComponent],
  templateUrl: './developer-card.component.html',
  styleUrl: './developer-card.component.css',
  standalone: true,
})
export class DeveloperCardComponent implements OnInit {
  @Input() developer: any;
  @Output() contact = new EventEmitter<void>();

  status: ContactStatus = ContactStatus.NotContacted;

  ngOnInit() {
    this.status = this.developer.status;
  }

  onContactStatusChange(newStatus: ContactStatus) {
    this.status = newStatus;
    this.contact.emit(); 
  }
}
