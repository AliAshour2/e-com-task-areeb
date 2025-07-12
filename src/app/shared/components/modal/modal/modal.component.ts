import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false ;
  @Input() title = '' ;
  @Input() showColse = true ;
  @Input() closeOnOverlayClick = true;
  @Output() close = new EventEmitter<void>();


  ngOnInit() {
    if (this.isOpen) {
      this.disableBodyScroll();
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

  onCloseClick() {
    this.closeModal();
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
