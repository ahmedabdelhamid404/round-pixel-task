import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  theme = new BehaviorSubject<string>('light');

  toggleTheme() {
    this.theme.next(this.theme.getValue() === 'light' ? 'dark' : 'light');
  }
}
