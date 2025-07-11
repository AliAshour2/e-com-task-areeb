import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SearchService } from '../../shared/services/search/search.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery = '';
  constructor(private searchService: SearchService) {}

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  // @Input() searchQuery = '';
  // @Output() searchQueryChange = new EventEmitter<string>();

  // onSearchChange(value: string) {
  //   this.searchQuery = value;
  //   this.searchQueryChange.emit(this.searchQuery);
  // }
}
