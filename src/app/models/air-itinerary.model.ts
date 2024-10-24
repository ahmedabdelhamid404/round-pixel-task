import { IFlight } from './flight.model';

export interface IAirItinerary {
  allJourney: IAllJourney;
  arrivalDate: string;
  baggageInformation: IBaggageInformation[];
  cabinClass: string;
  deptDate: string;
  flightType: string;
  isRefundable: boolean;
  itinTotalFare: IItinTotalFare;
  pKey: number;
  passengerFareBreakDownDTOs: IPassengerFareBreakDownDTO[];
  sequenceNum: number;
  totalDuration: number;
}

interface IAllJourney {
  flights: IFlight[];
}

interface IBaggageInformation {
  airlineName: string;
  baggage: string;
  childBaggage: unknown;
  deptCity: string;
  flightNum: string;
  infantBaggage: unknown;
  landCity: string;
}

export interface IItinTotalFare {
  amount: number;
  currencyCode: string;
  fareAmount: number;
  promoCode: unknown;
  promoDiscount: number;
  totalTaxes: number;
}

interface IPassengerFareBreakDownDTO {
  cancelPenaltyDTOs: IPenaltyDTO[];
  changePenaltyDTOs: IPenaltyDTO[];
  flightFaresDTOs: IFlightFaresDTO[];
  key: string;
  passengerQuantity: number;
  passengerType: string;
  passengersRef: string[];
  pricingMethod: string;
  taxes: ITax[];
}

interface IPenaltyDTO {
  curency: string;
  percentage: number;
  price: number;
}

interface IFlightFaresDTO {
  currencyCode: string;
  fareAmount: number;
  fareType: string;
}

interface ITax {
  amount: number;
  content: string;
  countryCode: unknown;
  taxCode: string;
  taxCurrencyCode: string;
  taxName: unknown;
}
