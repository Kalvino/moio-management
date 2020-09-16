import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Report } from '../models/report.model';
import { environment } from '../../../environments/environment';

/**
 * report service
 * encapsulates api interactions for
 * working with 'reports'
 */
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {
  }

  /**
   * get all reports from the moio-cloud api
   */
  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiHost}/api/telegrams`);
  }

  /**
   * delete a report
   * @param id report id
   */
  deleteReport(id: number): Observable<{}> {
    return this.http.delete<Report>(`${environment.apiHost}/api/reports/${id}`);
  }
}
