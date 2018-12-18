import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

/**
 * user service
 * encapsulates api interactions for
 * working with 'users'
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  /**
   * get all users from the moio-cloud api
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiHost}/api/usermanagement`);
  }

  /**
   * create a new user
   * @param user User
   */
  createUser(user: User): Observable<User> {
    return this.http.post(`${environment.apiHost}/api/appusers`, user);
  }

  /**
   * delete a user
   * @param id user id
   */
  deleteUser(id: number): Observable<{}> {
    return this.http.delete<User>(`${environment.apiHost}/api/users/${id}`);
  }

  /**
   * update a user
   * @param user object:User
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiHost}/api/users/${user.id}`, user);
  }


}
