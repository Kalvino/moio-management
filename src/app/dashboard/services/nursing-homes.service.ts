import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { NursingHome } from '../models/nursing-home.model';
import { environment } from '../../../environments/environment';

import { token } from '../../utilities';

@Injectable({
  providedIn: 'root',
})
export class NursingHomesService {

  constructor(private http: HttpClient) { }

  /**
   * get all nursing homes from the moio-cloud api
   */
  getNursingHomes(): Observable<NursingHome[]> {
    return this.http.get<NursingHome[]>(`${environment.apiHost}/api/nursinghomes`, { headers: token() });
  }

  /**
   * create a new nursingHome
   * @param nursingHome
   */
  createNursingHome(nursingHome: NursingHome): Observable<NursingHome> {
    return this.http
      .post(`${environment.apiHost}/api/nursinghomes`, { ...nursingHome }, { headers: token() });
  }

}
