import { Component, OnInit } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bills-admin';
  isLoading: boolean = true;

  constructor(
    private _translationService: TranslationService
  ) {}


  ngOnInit(): void {
    this._translationService.setLanguage('es').then(() => {
      this.isLoading = false;
    });
  }

}
