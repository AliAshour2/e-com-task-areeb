import {Component, EventEmitter, input, Input, output, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ContactStatus } from '../../../models/card.model';

@Component({
  selector: 'app-main-toggle-button',
  imports: [CommonModule],
  templateUrl: './main-toggle-button.component.html',
  styleUrl: './main-toggle-button.component.css',
  standalone : true

})
export class MainToggleButtonComponent {
  status = input<ContactStatus>(ContactStatus.NotContacted);
  statusChange = output<ContactStatus>();
  ContactStatus = ContactStatus;
  Toggle() {
    const newStatus =
      this.status() === ContactStatus.Contacted
        ? ContactStatus.NotContacted
        : ContactStatus.Contacted;
    this.statusChange.emit(newStatus);
  }

}



// @Input() status: ContactStatus = ContactStatus.NotContacted;
//   @Output() statusChange = new EventEmitter<ContactStatus>();
//   ContactStatus = ContactStatus;
//   Toggle() {
//     const newStatus =
//       this.status === ContactStatus.Contacted
//         ? ContactStatus.NotContacted
//         : ContactStatus.Contacted;
//     this.statusChange.emit(newStatus);
//   }