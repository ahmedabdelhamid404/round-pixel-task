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

  filteredFlights = new BehaviorSubject<fromModels.IFlightsResponse | null>(
    null
  );

  @ViewChild('sidenav') sidenav: MatSidenav;

  set patchSideNav(value: boolean) {
    if (value) {
      this.sidenav.close();
    }
  }

  get searchCurrencyCode() {
    return this.filteredFlights?.value?.searchCriteria?.currency;
  }

  ngOnInit(): void {
    // call the read flights method & store it in the service store
    this.callFlightsApi();
  }

  callFlightsApi() {
    this.flightsService
      .readFlights()
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        this.flightsService.flights = entityHelper.getClonedData(val);
        this.filteredFlights.next(entityHelper.getClonedData(val));
      });
  }
}
