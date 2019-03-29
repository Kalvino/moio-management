import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {IDevice} from '../model/device.model';
import {environment} from '../../../../environments/environment';
import {delay} from 'rxjs/operators';
import {IDeviceSetting} from '../model/device-settings.model';
import {IDeviceLogs} from '../model/device-logs.model';
import {IDeviceCommand} from '../model/device-command.model';

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

    getAllDeviceCommands(): Observable<IDeviceCommand[]> {
        return this.http.get<IDeviceCommand[]>(`${environment.apiHost}/api/devices_commands`);
    }

    triggerDeviceCommands(deviceId, commandId): Observable<any> {
        return this.http.post(`${environment.apiHost}/api/devices/command_queue`, {'device_id': deviceId, 'command_code_id': commandId});
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
    getAllDeviceLogs(deviceId): Observable<IDeviceLogs[]> {
        return this.http.get<IDeviceLogs[]>(`${environment.apiHost}/api/devices/log/${deviceId}`);
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
