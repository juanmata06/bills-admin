import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { iUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedUser: BehaviorSubject<iUser> = new BehaviorSubject<iUser>(undefined!);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  set loggedUser(value: iUser) {
    localStorage.setItem('currentUser', JSON.stringify({ id: value.id }));
    this._loggedUser.next(value);
    this._router.navigate(['/']);
  }

  get loggedUser$(): Observable<iUser> {
    return this._loggedUser.asObservable();
  }

  private getUsersList(): Observable<iUser[]> {
    const currentUsers = localStorage.getItem('currentUsers');
    return currentUsers ? of(JSON.parse(currentUsers)) : this._http.get<iUser>('assets/data/user-list.json');
  }

  public login(data: { email: string; password: string }): Observable<iUser> {
    return this.getUsersList().pipe(
      map((users: iUser[] | null) => {
        const user = users?.find(
          (u) => u.email === data.email && u.password === data.password
        );
        if (user) {
          this.loggedUser = user;
          return user;
        }
        throw new Error('Incorrect credentials.');
      })
    );
  }

  public getCurrentUserData(): Observable<void> {
    const currentUserId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!)?.id : null;

    if (!currentUserId) {
      this.logout();
      return of();
    }

    return this.getUsersList().pipe(
      map((users: iUser[] | null) => {
        const user = users?.find((u) => u.id === currentUserId);
        if (user) {
          this.loggedUser = user;
        } else {
          this.logout();
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this._loggedUser.next(undefined!);
    this._router.navigate(['/login']);
  }
}
