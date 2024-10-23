export interface ISearchCriteria {
  adultNum: number;
  childAges: number;
  childNum: number;
  currency: 'KWD';
  device: unknown;
  flightType: string;
  flights: {
    arrivingTo: 'KWI';
    departingFrom: 'CAI';
    departingOnDate: string;
  }[];
  infantAges: number;
  infantNum: number;
  language: 'en';
  pos: 'EG';
  preferredAirline: unknown;
  selectDirectFlightsOnly: boolean;
  selectedFlightClass: string;
  source: string;
  totalPassengersNum: number;
}
