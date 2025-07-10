import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SearchIconComponent } from '../../icons/search-icon/search-icon.component';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchQueryChange.emit(this.searchQuery);
  }
}
