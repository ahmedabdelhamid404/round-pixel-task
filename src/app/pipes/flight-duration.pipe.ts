import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDuration',
})
export class FlightDurationPipe implements PipeTransform {
  transform(deptDate: string, arrivalDate: string): string {
    const departure = new Date(deptDate);
    const arrival = new Date(arrivalDate);

    // Calculate the difference in milliseconds
    const diffMs = arrival.getTime() - departure.getTime();

    // Convert milliseconds to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  }
}
