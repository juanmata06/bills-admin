import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { iUser } from '../../../../logic/interfaces/user.interface';
import { UserService } from '../../../../logic/services/user.service';
import { TranslationService } from '../../../../shared/services/translation.service';
import { AuthService } from '../../../../logic/services/auth.service';

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
  currentUserDetails: iUser;
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
    private _translationService: TranslationService,
    private _authService: AuthService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser();
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
  private subscribeToCurrentUser(): void {
    this._authService.loggedUser$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response: iUser) => {
        this.currentUserDetails = response;
        this.createForm();
      },
      error: (badRequest) => this._authService.logOut()
    });
    this.createForm();
  }

  private createForm(): void {
    this.form = this._formBuilder.group({
      name: [this.currentUserDetails?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [{ value: this.currentUserDetails?.email || '', disabled: true }, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: [this.currentUserDetails?.address || '', [Validators.maxLength(50)]],
      creation_date: [{ value: this.currentUserDetails?.creation_date || '', disabled: true }],
      password: ['', [Validators.minLength(5)]],
      confirmation_password: ['', [Validators.minLength(5)]],
    });
    this.loading = false;
  }

  private saveOrEditForm(): void {
    const data = this.form.value;

    delete data['confirmation_password'];
    if (!data['password']) { data['password'] = this.currentUserDetails.password; }

    this._userService.updateUser({
      ...data,
      id: this.currentUserDetails.id,
      email: this.currentUserDetails.email,
      creation_date: this.currentUserDetails.creation_date
    }).subscribe({
      next: (response) => {
        window.alert(this._translationService.translate('Profile data updated'));
        this._authService.getCurrentUserData().subscribe();
      },
      error: () => window.alert(this._translationService.translate('An error has occurred updating the profile data'))
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
  get notValidPassword() {
    return this.form.controls['password'].touched && (!this.form.controls['password'].valid || !this.comparePasswords());
  }

  get notValidConfirmationPassword() {
    return (this.form.controls['password'].touched || this.form.controls['confirmation_password'].touched) && (!this.form.controls['confirmation_password'].valid || !this.comparePasswords());
  }

  public comparePasswords(): boolean {
    return this.form.controls['password'].value == this.form.controls['confirmation_password'].value;
  }
  public validateForm(): void {
    if (this.form.invalid || !this.comparePasswords()) {
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
