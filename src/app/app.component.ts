import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from './components/header/header.component';
import { ToastService } from './shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./shared/components/toast/toast.component";


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-com-task-areeb';
  // searchQuery = '';

  constructor(public toastService: ToastService) {}

  get toast() {
    return this.toastService.toast;
  }

  // onSearchQueryChange(query: string) {
  //   this.searchQuery = query;
  // }
}
