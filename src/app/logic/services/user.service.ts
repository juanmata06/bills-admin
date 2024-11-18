import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { v4 as uuidv4 } from 'uuid'
import { iUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<iUser[]> {
    const currentUsers = localStorage.getItem('currentUsers');
    return currentUsers ? of(JSON.parse(currentUsers)) : this._http.get<iUser>('assets/data/user-list.json');
  }

  getUserById(id: string): Observable<iUser> {
    const currentUsers = this.getUserList();
    return currentUsers.pipe(map((users: iUser[]) => {
      const user = users.find((item: iUser) => item.id === id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }      
      return user;
    }));
  }

  updateUser(data: iUser): Observable<iUser> {
    return this.getUserList().pipe(
      map((users: iUser[]) => {
        const index = users.findIndex((item: iUser) => item.id === data.id);        
        if (index >= 0) {
          users[index] = data;
          localStorage.setItem('currentUsers', JSON.stringify(users));
          return data;
        } else {
          throw new Error();
        }
      }),
      catchError((error) => {
        return throwError(() => new Error('Error updating User'));
      })
    );
  }
}
