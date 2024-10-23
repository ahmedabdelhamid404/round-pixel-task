import { IAirItinerary } from './air-itinerary.model';
import { ISearchCriteria } from './search-criteria.model';

export interface IFlightsResponse {
  status: string;
  airItineraries: IAirItinerary[];
  airlines: string[];
  cabinClasses: string[];
  searchCriteria: ISearchCriteria;
  searchResultException: ISearchResultException;
}

type ISearchResultException = {
  code: string;
  exceptionMessage: string;
};
