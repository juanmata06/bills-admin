import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { iUser } from '../../logic/interfaces/user.interface';
import { UserService } from '../../logic/services/user.service';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  loading: boolean = false;
  id: string;
  userDetails: iUser;
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
    private _userService: UserService,
    private _translationService: TranslationService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    // this.id = this._route.snapshot.params["id"];

    // if ((!this.id) || this.id == '' || this._router.url.includes('invoices/create')) {
      this.createForm();
    //   return;
    // }
    // this.getInvoiceDetails();
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
      name: [this.userDetails?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [this.userDetails?.email, [Validators.required]],
      address: [this.userDetails?.address || '', [Validators.maxLength(50)]],
      creation_date_time: [this.userDetails?.creation_date_time || ''],
      password: ['', [Validators.minLength(2)]],
      confirmation_password: ['', [Validators.minLength(2)]],
    });
    this.loading = false;
  }

  private getInvoiceDetails(): void {
    // this._invoiceService.getInvoiceById(this.id).subscribe({
    //   next: (response: iInvoice) => {
    //     this.invoiceDetails = response;
    //     if (this.invoiceDetails.file) { this.invoiceDetails['file'] = this.invoiceDetails.file.split("\\").pop() }
    //     this.createForm();
    //   },
    //   error: (badRequest) => this.goBackToList()
    // });
  }

  private saveOrEditForm(): void {
    // if (this.id) {
    //   this._invoiceService.updateInvoice({ ...this.form.value, id: this.id }).subscribe({
    //     next: (response) => window.alert(this._translationService.translate('Invoice updated')),
    //     complete: () => this.goBackToList()
    //   });
    // } else {
    //   this._invoiceService.postInvoice(this.form.value).subscribe({
    //     next: (response) => window.alert(this._translationService.translate('Invoice created')),
    //     complete: () => this.goBackToList()
    //   });
    // }
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
