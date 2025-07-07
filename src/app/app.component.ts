import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from './components/header/header.component';
import { ShopComponent } from './pages/shop/shop.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent , HeaderComponent , ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-com-task-areeb';
}
