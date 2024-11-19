import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { iUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedUser: BehaviorSubject<iUser> = new BehaviorSubject<iUser>(undefined!);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _userService: UserService
  ) { }

  set loggedUser(value: iUser) {
    localStorage.setItem('currentUser', JSON.stringify({ id: value.id }));
    this._loggedUser.next(value);
  }

  get loggedUser$(): Observable<iUser> {
    return this._loggedUser.asObservable();
  }

  public login(data: { email: string; password: string }): Observable<iUser> {
    return this._userService.getUserList().pipe(
      map((users: iUser[] | null) => {
        const user = users?.find(
          (u) => u.email === data.email && u.password === data.password
        );
        if (user) {
          this.loggedUser = user;
          this._router.navigate(['/']);
          return user;
        }
        throw new Error('Incorrect credentials.');
      })
    );
  }

  public getCurrentUserData(): Observable<void> {
    const currentUserId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!)?.id : null;

    if (!currentUserId) {
      this.logOut();
      return of();
    }

    return this._userService.getUserList().pipe(
      map((users: iUser[] | null) => {
        const user = users?.find((u) => u.id === currentUserId);
        if (user) {
          this.loggedUser = user;
        } else {
          this.logOut();
        }
      })
    );
  }

  public logOut(): void {
    localStorage.removeItem('currentUser');
    this._loggedUser.next(undefined!);
    this._router.navigate(['/login']);
  }
}
