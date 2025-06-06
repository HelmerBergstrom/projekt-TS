import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  isSmallMenuOpen = false;

  // Öppnar menyn i mindre skärmbreddar.
  toggleSmallMenu() {
      this.isSmallMenuOpen = !this.isSmallMenuOpen;
  }
}
