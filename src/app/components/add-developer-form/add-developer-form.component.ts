import { Component, EventEmitter, Output } from '@angular/core';
import { AddDeveloperForm } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-developer-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-developer-form.component.html',
  styleUrl: './add-developer-form.component.css'
})
export class AddDeveloperFormComponent {
  @Output() submit = new EventEmitter<AddDeveloperForm>();
  @Output() cancel = new EventEmitter<void>();


  developerForm: AddDeveloperForm = {
    name: '',
    role: '',
    level: 'Junior',
    salary: 0,
    description: ''
  };

  levels = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Mid', label: 'Mid-Level' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Lead', label: 'Lead' }
  ];


  onSubmit() {
    if (this.isFormValid()) {
      this.submit.emit(this.developerForm);
      this.resetForm();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private isFormValid(): boolean {
    return !!(
      this.developerForm.name.trim() &&
      this.developerForm.role.trim() &&
      this.developerForm.description.trim() &&
      this.developerForm.salary > 0
    );
  }

  private resetForm() {
    this.developerForm = {
      name: '',
      role: '',
      level: 'Junior',
      salary: 0,
      description: ''
    };
  }
}
