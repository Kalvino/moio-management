import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IDevice } from '../model/device.model';
import { environment } from '../../../../environments/environment';
import { delay } from 'rxjs/operators';
import { IDeviceSetting } from '../model/device-settings.model';
import { IDeviceLogs } from '../model/device-logs.model';

/**
 * patient service
 * encapsulates api interactions for
 * working with 'patients'
 */
@Injectable({
    providedIn: 'root'
})
export class DevicesService {

    constructor(private http: HttpClient) {

    }

    /**
     * Get all devices from the API
     */
    getAllDeviceSettings(): Observable<IDeviceSetting[]> {
        return this.http.get<IDeviceSetting[]>('https://fcc34170-5efa-455b-8217-132846e1421c.mock.pstmn.io/api/devices/3/settings/all');
    }

    /**
     * Get all devices from the API
     */
    getAllDeviceLogs(): Observable<IDeviceLogs[]> {
        return this.http.get<IDeviceLogs[]>('https://fcc34170-5efa-455b-8217-132846e1421c.mock.pstmn.io/api/devices/3/logs/all');
    }

    /**
     * Get all devices from the API
     */
    getAllDevices(): Observable<IDevice[]> {
        return this.http.get<IDevice[]>(`${environment.apiHost}/api/devices`);
    }

    /**
     * Get a single device from the API
     */
    getSingleDevice(deviceId): Observable<IDevice> {
        return this.http.get<IDevice>(environment.apiHost + '/api/devices/' + deviceId);
    }

}
