import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-travel';

  // initialize the theme with light theme
  constructor() {
    document.body.classList.add('light');
  }
}
