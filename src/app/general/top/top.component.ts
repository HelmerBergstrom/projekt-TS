import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top',
  imports: [RouterLink],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  public headerImg: string = '/android-chrome-192x192.png';
}
