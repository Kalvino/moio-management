import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPatient } from '../models/patient.model';
import { environment } from '../../../environments/environment';
import { Update } from '@ngrx/entity';

/**
 * patient service
 * encapsulates api interactions for
 * working with 'patients'
 */
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) {
  }

  /**
   * get all patients from the moio-cloud api
   */
  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(`${environment.apiHost}/api/patients`);
  }

  /**
   * create a new patient
   * @param patient IPatient
   */
  createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(`${environment.apiHost}/api/patients`, patient);
  }

  /**
   * delete a patient
   * @param id patient id
   */
  deletePatient(id: number): Observable<{}> {
    return this.http.delete<IPatient>(`${environment.apiHost}/api/patients/${id}`);
  }

  /**
   * update a patient
   * @param patient object:IPatient
   */
  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${environment.apiHost}/api/patients/${patient.id}`, patient);
  }

  /**
   * edit a patient
   * @param changed
   */
  editPatient(changed: Update<IPatient>): Observable<IPatient> {
    return this.http
      .put<IPatient>(`${environment.apiHost}/api/patients/${changed.id}`, { ...changed.changes });
  }
}
