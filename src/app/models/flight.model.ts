export interface IFlight {
  elapsedTime: number;
  flightAirline: IFlightAirline;
  flightDTO: IFlightDTO[];
  stopsNum: number;
}

interface IFlightAirline {
  airlineCode: string;
  airlineLogo: string;
  airlineName: string;
  alternativeBusinessName: string;
  passportDetailsRequired: boolean;
}

interface IFlightDTO {
  arrivalDate: string;
  arrivalOffset: number;
  arrivalTerminalAirport: ITerminalAirport;
  departureDate: string;
  departureOffset: number;
  departureTerminalAirport: ITerminalAirport;
  flightAirline: IFlightAirline;
  flightInfo: IFlightInfo;
  isStopSegment: boolean;
  landTime: string;
  operatedAirline: IFlightAirline;
  segmentDetails: ISegmentDetails;
  supplierRefID: unknown;
  transitTime: string;
}

interface ITerminalAirport {
  airportCode: string;
  airportName: string;
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  regionName: string;
}

interface IFlightInfo {
  bookingCode: string;
  cabinClass: string;
  equipmentNumber: string;
  flightNumber: string;
  mealCode: string;
}

interface ISegmentDetails {
  baggage: string;
  childBaggage: unknown;
  infantBaggage: unknown;
  uniqueKey: string;
}
