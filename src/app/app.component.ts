import { Component } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bills-admin';

  constructor(
    private _translationService: TranslationService
  ) {
    this._translationService.setLanguage('es');
  }
}
