import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-chip',
  imports: [CommonModule],
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.css',
  standalone: true,
})
export class CategoryChipComponent {
  @Input() category: string = '';
}
