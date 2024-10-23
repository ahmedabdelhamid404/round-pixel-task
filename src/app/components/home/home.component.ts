import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private _router = inject(Router);

  navigateToFlights() {
    this._router.navigate(['/flights-results']);
  }
}
