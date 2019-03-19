import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NursingHome } from '../models/nursing-home.model';
import { environment } from '../../../environments/environment';

import { Update } from '@ngrx/entity';
import { Geofencing } from '../models/nursing-home-geofencing.model';

@Injectable({
  providedIn: 'root',
})
export class NursingHomesService {

  constructor(private http: HttpClient) { }

  /**
   * get all nursing homes from the moio-cloud api
   */
  getNursingHomes(): Observable<NursingHome[]> {
    return this.http.get<NursingHome[]>(`${environment.apiHost}/api/nursinghomes`);
  }

  /**
   * create a new nursingHome
   * @param nursingHome
   */
  createNursingHome(nursingHome: NursingHome): Observable<NursingHome> {
    return this.http
      .post(`${environment.apiHost}/api/nursinghomes`, { ...nursingHome });
  }

  /**
   * delete a nursingome
   * @param id nursingome id
   */
  deleteNursingHome(id: number): Observable<{}> {
    return this.http.delete<NursingHome>(`${environment.apiHost}/api/nursinghomes/${id}`);
  }

  /**
   * update a nursingome
   * @param nursingome object:NursingHome
   */
  updateNursingHome(nursingome: NursingHome): Observable<NursingHome> {
    return this.http.put<NursingHome>(`${environment.apiHost}/api/nursinghomes/${nursingome.id}`, nursingome);
  }

  /**
   * edit a nursingome
   * @param nursinghome
   */
  editNursingHome(nursinghome: Update<NursingHome>): Observable<NursingHome> {
    return this.http
      .put<NursingHome>(`${environment.apiHost}/api/nursinghomes/${nursinghome.id}`, { ...nursinghome.changes });
  }

  /**
     * get all geofencing belonging to a nursing home from the moio-cloud api
     * @param id nursingome id
     */
  getNursingHomeGeofencing(id: number): Observable<Geofencing[]> {
    return this.http.get<Geofencing[]>(`${environment.apiHost}/api/nursinghomes/${id}/geofencing`);
  }

}
