import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICredentials } from '../models/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  /**
   * log user in to API
   * @param credentials user credentials
   */
  login(credentials: ICredentials): Observable<any> {
    return this.http
      .post(`${environment.apiHost}/api/auth/loginmanagement`, credentials);
  }

  /**
   * log user out of the API
   */
  logout(): Observable<any> {
    return this.http.get(`${environment.apiHost}/api/auth/logout`);
  }

  constructor(private http: HttpClient) {
  }
}
