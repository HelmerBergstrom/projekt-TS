import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './general/main-menu/main-menu.component';
import { FooterComponent } from './general/footer/footer.component';
import { TopComponent } from "./general/top/top.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenuComponent, FooterComponent, TopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projekt-TS';
}
