import { Component, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from '../../../logic/services/auth.service';
import { iUser } from '../../../logic/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  loading: boolean = false;
  currentUserDetails: iUser;
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _authService: AuthService,
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
      },
      error: (badRequest) => this.logOut()
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
  public logOut(): void {
    this._authService.logOut();
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}
