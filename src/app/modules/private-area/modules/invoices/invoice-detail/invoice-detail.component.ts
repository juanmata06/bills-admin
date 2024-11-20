import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { iInvoice } from '../../../../../logic/interfaces/invoice.interface';
import { InvoiceService } from '../../../../../logic/services/invoice.service';
import { TranslationService } from '../../../../../shared/services/translation.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  loading: boolean = false;
  id: string;
  invoiceDetails: iInvoice;
  form: FormGroup;
  formFile: File | undefined;
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
    private _invoiceService: InvoiceService,
    private _translationService: TranslationService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.params["id"];

    if ((!this.id) || this.id == '' || this._router.url.includes('invoices/create')) {
      this.createForm();
      return;
    }
    this.getInvoiceDetails();
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
      name: [this.invoiceDetails?.name || '', [Validators.required, Validators.minLength(2)]],
      creation_date: [this.invoiceDetails?.creation_date || new Date().toISOString().split('T')[0]],
      amount: [this.invoiceDetails?.amount || ''],
      supply_address: [this.invoiceDetails?.supply_address || '', [Validators.maxLength(50)]],
      file: [null],
    });
    this.loading = false;
  }

  private getInvoiceDetails(): void {
    this._invoiceService.getInvoiceById(this.id).subscribe({
      next: (response: iInvoice) => {
        this.invoiceDetails = response;
        if (this.invoiceDetails.file) { this.invoiceDetails['file'] = this.invoiceDetails.file.split("\\").pop() }
        this.createForm();
      },
      error: (badRequest) => this.goBackToList()
    });
  }

  private saveOrEditForm(): void {
    if (this.id) {
      this._invoiceService.updateInvoice({ ...this.form.value, id: this.id,  }).subscribe({
        next: (response) => window.alert(this._translationService.translate('Invoice updated')),
        complete: () => this.goBackToList()
      });
    } else {
      this._invoiceService.postInvoice(this.form.value).subscribe({
        next: (response) => window.alert(this._translationService.translate('Invoice created')),
        complete: () => this.goBackToList()
      });
    }
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
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.formFile = input.files[0];
    } else {
      this.formFile = undefined;
    }
  }

  public getFormFile(): void {
    const url = URL.createObjectURL(this.formFile!);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.formFile!.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

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
