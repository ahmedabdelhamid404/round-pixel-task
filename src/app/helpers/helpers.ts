import * as fromModels from '@app/models';

export class entityHelper {
  static getClonedData(data: fromModels.IFlightsResponse) {
    return JSON.parse(JSON.stringify(data));
  }
}
