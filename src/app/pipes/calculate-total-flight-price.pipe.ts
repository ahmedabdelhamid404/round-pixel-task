import { Pipe, PipeTransform } from '@angular/core';
import * as fromModels from '@app/models';

@Pipe({
  name: 'calculateTotalFlightPrice',
})
export class CalculateTotalFlightPricePipe implements PipeTransform {
  transform(itinTotalFare: fromModels.IItinTotalFare): number {
    const { totalTaxes, amount, promoDiscount } = itinTotalFare;
    return totalTaxes + amount - promoDiscount;
  }
}
