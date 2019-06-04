import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IDevice } from '../models/device.model';
import { environment } from '../../../environments/environment';
import { Update } from '@ngrx/entity';
import { IDeviceReport } from '../models/device-report.model';

/**
 * device service
 * encapsulates api interactions for
 * working with 'devices'
 */
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) {
  }

  /**
   * get all devices from the moio-cloud api
   */
  getDevices(): Observable<IDevice[]> {
    return this.http.get<IDevice[]>(`${environment.apiHost}/api/devices`);
  }

  /**
   * get all reports belonging to a device from the moio-cloud api
   * @param id device id
   */
  getDevicePatients(id: number): Observable<IDeviceReport[]> {
    return this.http.get<IDeviceReport[]>(`${environment.apiHost}/api/devices/${id}/reports`);
  }

  /**
   * create a new device
   * @param device Device
   */
  createDevice(device: IDevice): Observable<IDevice> {
    return this.http.post<IDevice>(`${environment.apiHost}/api/devices`, device);
  }

  /**
   * delete a device
   * @param id device id
   */
  deleteDevice(id: number): Observable<{}> {
    return this.http.delete<IDevice>(`${environment.apiHost}/api/devices/${id}`);
  }

  /**
   * update a device
   * @param device object:Device
   */
  updateDevice(device: IDevice): Observable<IDevice> {
    return this.http.put<IDevice>(`${environment.apiHost}/api/devices/${device.id}`, device);
  }

  /**
   * edit a device
   * @param changed
   */
  editDevice(changed: Update<IDevice>): Observable<IDevice> {
    return this.http
      .put<IDevice>(`${environment.apiHost}/api/devices/${changed.id}`, { ...changed.changes });
  }


}
