import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap, mergeMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';


import {
    DeviceLogsActionTypes,
    LoadAllDeviceLogsRequest,
    LoadAllDeviceLogsFailure,
    LoadAllDeviceLogsSuccess,
} from '../actions/device-logs.actions';


@Injectable()
export class DeviceLogsEffects {

    @Effect()
    loadAllDeviceLogs$ = this.actions$
        .pipe(
            ofType<LoadAllDeviceLogsRequest>(DeviceLogsActionTypes.LoadAllDeviceLogsRequest),
            mergeMap(() => this.deviceService.getAllDeviceLogs()),
            map(deviceLogs => new LoadAllDeviceLogsSuccess({deviceLogs}))
        );

    constructor(
        private deviceService: DevicesService,
        private actions$: Actions
    ) {
    }
}
