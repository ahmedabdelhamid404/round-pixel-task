import { Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as fromServices from '@app/services';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-travel';

  themeService = inject(fromServices.ThemeService);

  constructor() {
    this.themeService.theme.pipe(untilDestroyed(this)).subscribe((theme) => {
      console.log(theme);
      document.body.setAttribute('theme', theme);
    });
  }
}
