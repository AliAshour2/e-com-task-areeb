import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
  standalone: true,
})
export class StatusBadgeComponent {
  @Input() status: 'Contacted' | 'Not-Contacted' = 'Not-Contacted';
}
