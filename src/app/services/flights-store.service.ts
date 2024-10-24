import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as fromModels from '@app/models';

@Injectable()
export class FlightsStoreService {
  flights: fromModels.IFlightsResponse;

  constructor(private http: HttpClient) {}

  // read flights from the json file method
  readFlights() {
    return this.http.get<fromModels.IFlightsResponse>('assets/response.json');
  }

  // filter flights by airline name
  filterByAirLineName(
    flight: fromModels.IAirItinerary,
    airLineName: string | null
  ): boolean {
    if (airLineName === 'All') {
      return true;
    }
    return (
      flight.allJourney.flights[0].flightAirline.airlineName === airLineName
    );
  }

  // filter flights by airport name
  filterByAirportName(
    flight: fromModels.IAirItinerary,
    airPortName: string | null
  ): boolean {
    // this means no search Term provided
    if (!airPortName) {
      return true;
    }

    const terminalFound = flight.allJourney.flights[0].flightDTO.find(
      (flight) =>
        flight.departureTerminalAirport.airportName
          .toLocaleLowerCase()
          .includes(airPortName.toLocaleLowerCase())
    );

    return !!terminalFound;
  }

  // this method compare the flight total price with the max or min depend on third argument
  filterByPrice(
    flight: fromModels.IAirItinerary,
    price: number | null,
    sort: 'Max' | 'Min'
  ) {
    if (!price) return;
    const { itinTotalFare } = flight;
    const totalFlightPrice =
      itinTotalFare.amount +
      itinTotalFare.totalTaxes -
      itinTotalFare.promoDiscount;
    if (sort === 'Max') return !!(totalFlightPrice <= price);
    else return !!(totalFlightPrice >= price);
  }

  // filter flights method
  filterFlights(
    flights: fromModels.IFlightsResponse,
    event: {
      minPrice: number | null;
      maxPrice: number | null;
      airLine: string | null;
      airportName: string | null;
    }
  ) {
    const { airItineraries, ...rest } = flights;
    const airItinerariesResults = airItineraries.filter((flight) => {
      return (
        this.filterByAirLineName(flight, event.airLine) &&
        this.filterByAirportName(flight, event.airportName) &&
        this.filterByPrice(flight, event.minPrice, 'Min') &&
        this.filterByPrice(flight, event.maxPrice, 'Max')
      );
    });
    const filteredFlights = {
      ...rest,
      airItineraries: airItinerariesResults,
    };
    return filteredFlights;
  }
}
