import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { InvoiceService } from '../../logic/services/invoice.service';
import { TranslationService } from '../../shared/services/translation.service';
import { AuthService } from '../../logic/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  loading: boolean = false;
  id: string;
  form: FormGroup;
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _translationService: TranslationService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  private createForm(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    });
    this.loading = false;
  }

  private saveOrEditForm(): void {
    this._authService.login(this.form.value).subscribe({
      next: (response: any) => {        
      },
      error: (badRequest) => window.alert(this._translationService.translate("Error, the email or password doesn't exist")),
    });
  }

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

  public goBackToList(): void {
    this._router.navigate(['/']);
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  public validateForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      window.alert(this._translationService.translate('There are fields with errors that you must correct.'));
      return;
    }
    this.saveOrEditForm();
  }

  public isNotValidField(controlName: string): boolean {
    return Object.keys(this.form.value).includes(controlName) &&
      this.form.controls[controlName].invalid &&
      (this.form.controls[controlName].dirty || this.form.controls[controlName].touched);
  }
}
