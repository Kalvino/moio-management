import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * get all users from the moio-cloud api
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiHost}/api/usermanagement`);
  }

  /**
   * create a new user
   * @param user
   */
  createUser(user: User): Observable<User> {
    return this.http
      .post(`${environment.apiHost}/api/appusers`, {...user});
  }

}
