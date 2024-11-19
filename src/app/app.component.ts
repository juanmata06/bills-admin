import { Component, OnInit } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';
import { AuthService } from './logic/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  title = 'bills-admin';
  isLoading: boolean = true;

  /**
  * -----------------------------------------------------------------------------------------------------------------------------
  * LYFECYCLE METHODS
  * -----------------------------------------------------------------------------------------------------------------------------
  */
  constructor(
    private _translationService: TranslationService,
    private _authService: AuthService
  ) { }


  ngOnInit(): void {
    this._authService.getCurrentUserData().subscribe({
      next: (response) => {        
        this._translationService.setLanguage(localStorage.getItem('currentLanguage') || 'es').then(() => {
          this.isLoading = false;
        });
      },
      error: (err) => {
        this._authService.logOut();
        this._translationService.setLanguage(localStorage.getItem('currentLanguage') || 'es').then(() => {
          this.isLoading = false;
        });
      },
    });
  }
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}