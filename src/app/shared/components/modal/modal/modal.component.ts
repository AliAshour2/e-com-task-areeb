import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { TruncatePipe } from '../../../../pipes/truncate-pipe/truncate.pipe';

@Component({
  selector: 'app-modal',
  imports: [ClickOutsideDirective , TruncatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title? = '';
  @Input() showClose = true;
  @Input() closeOnOverlayClick = true;
  @Output() close = new EventEmitter<void>();


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    }
  }

  ngOnDestroy() {
    this.enableBodyScroll();
  }

  onOverlayClick() {
    if (this.closeOnOverlayClick) {
      this.closeModal();
    }
  }

  private closeModal() {
    this.enableBodyScroll();
    this.close.emit();
  }

  private disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll() {
    document.body.style.overflow = '';
  }
}
