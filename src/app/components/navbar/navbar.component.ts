import { Component, inject, OnInit } from '@angular/core';

import * as fromServices from '@app/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  themeService = inject(fromServices.ThemeService);
  currentTheme: string;

  ngOnInit(): void {
    this.themeService.theme.pipe(untilDestroyed(this)).subscribe((val) => {
      this.currentTheme = val;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
