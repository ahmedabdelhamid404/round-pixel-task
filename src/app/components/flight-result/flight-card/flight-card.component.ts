import { Component, Input } from '@angular/core';
import * as fromModels from '@app/models/air-itinerary.model';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input() airItinerary: fromModels.IAirItinerary;
}
