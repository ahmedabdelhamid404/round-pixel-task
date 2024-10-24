import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { entityHelper } from '@app/helpers/helpers';
import { FlightsStoreService } from '@app/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import * as fromModels from '@app/models';

@UntilDestroy()
@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss'],
})
export class FlightResultComponent implements OnInit {
  flightsService = inject(FlightsStoreService);

  filteredFlights$ = new BehaviorSubject<fromModels.IFlightsResponse | null>(
    null
  );

  isLoading$ = new BehaviorSubject<boolean>(false);

  @ViewChild('sidenav') sidenav: MatSidenav;

  set patchSideNav(value: boolean) {
    if (value) {
      this.sidenav.close();
    }
  }

  get searchCurrencyCode() {
    return this.flightsService.flights?.searchCriteria?.currency;
  }

  get airLines() {
    return this.flightsService.flights?.airlines;
  }

  ngOnInit(): void {
    // call the read flights method & store it in the service store
    this.callFlightsApi();
  }

  // this method call the read json method to get all the data provided in json
  callFlightsApi() {
    this.isLoading$.next(true);
    this.flightsService
      .readFlights()
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        this.flightsService.flights = entityHelper.getClonedData(val);
        this.filteredFlights$.next(entityHelper.getClonedData(val));
        this.isLoading$.next(false);
      });
  }

  // filter flights method takes a brand new copy of the data loaded & pass it to be filtered according to what user chosen to return new response & throw it to the BehaviorSubject subject to be displayed
  filterFlights(event: {
    minPrice: number | null;
    maxPrice: number | null;
    airLine: string | null;
    airportName: string | null;
  }) {
    const results = this.flightsService.filterFlights(
      entityHelper.getClonedData(this.flightsService.flights),
      event
    );
    this.filteredFlights$.next(entityHelper.getClonedData(results));
    // close sidenav if it is opened
    if (this.sidenav.opened) {
      this.sidenav.close();
    }
  }
}
