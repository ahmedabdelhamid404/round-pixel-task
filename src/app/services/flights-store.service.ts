import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import * as fromModels from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class FlightsStoreService {
  flights: fromModels.IFlightsResponse;

  constructor(private http: HttpClient) {}

  // read flights from the json file method
  readFlights() {
    return this.http.get<fromModels.IFlightsResponse>('/assets/response.json');
  }
}
