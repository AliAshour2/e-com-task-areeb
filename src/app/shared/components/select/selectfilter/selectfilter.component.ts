import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selectfilter',
  imports: [CommonModule , FormsModule],
  templateUrl: './selectfilter.component.html',
  styleUrl: './selectfilter.component.css',
  standalone : true ,
})
export class SelectfilterComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() defaultValue: string = '';
  @Input() label: string = '';
  @Input() selectedValue: string = '';
  @Output() selectedValueChange = new EventEmitter<string>();
  onChange() {
    this.selectedValueChange.emit(this.selectedValue);
  }
}
