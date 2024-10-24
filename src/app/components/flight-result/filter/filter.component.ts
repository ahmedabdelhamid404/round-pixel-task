import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() currencyCode?: string;
  @Input() airLines?: string[];
  @Output() close = new EventEmitter<boolean>();
  @Output() filter = new EventEmitter<{
    minPrice: number;
    maxPrice: number;
    airLine: string;
    airportName: string;
  }>();

  minPriceValue = 100;
  maxPriceValue = 1000;
  // Price controls
  minPrice = new FormControl(this.minPriceValue);
  maxPrice = new FormControl(this.maxPriceValue);

  // Airline control
  airLine = new FormControl('All');

  // Airport name control
  airportName = new FormControl('', [
    Validators.pattern(/^[^\u0600-\u06FF]+$/),
  ]);

  get airPortNameRegexValidation() {
    return this.airportName?.hasError('pattern');
  }

  ngOnInit(): void {
    this.setupFiltration();
  }

  setupFiltration() {
    combineLatest([
      this.minPrice.valueChanges.pipe(startWith(this.minPrice.value)),
      this.maxPrice.valueChanges.pipe(startWith(this.maxPrice.value)),
      this.airLine.valueChanges.pipe(startWith(this.airLine.value)),
      this.airportName.valueChanges.pipe(startWith(this.airportName.value)),
    ])
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      .subscribe(([minPrice, maxPrice, airLine, airportName]) => {
        const isAirportNameValid = !this.airportName?.hasError('pattern');
        if (isAirportNameValid) {
          this.filter.emit({
            minPrice: minPrice || 4000,
            maxPrice: maxPrice || 10000,
            airLine: airLine || '',
            airportName: airportName || '',
          });
        }
      });
  }
}
