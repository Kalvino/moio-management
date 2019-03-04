import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap, mergeMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';
import {IDevice} from '../../model/device.model';
import * as deviceAction from '../actions/device.actions';


import {
    DevicesActionTypes,
    LoadAllDevicesRequest,
    LoadAllDevicesSuccess,
    LoadSingleDeviceRequest,
    LoadSingleDeviceSuccess
} from '../actions/device.actions';


@Injectable()
export class DeviceEffects {

    @Effect()
    loadAllDevices$ = this.actions$
        .pipe(
            ofType<LoadAllDevicesRequest>(DevicesActionTypes.LoadAllDevicesRequest),
            mergeMap(() => this.deviceService.getAllDevices()),
            map(devices => new LoadAllDevicesSuccess({devices}))
        );

    @Effect()
    loadSingleDevice$ = this.actions$
        .pipe(
            ofType<LoadSingleDeviceRequest>(DevicesActionTypes.LoadSingleDeviceRequest),
            mergeMap(() => this.deviceService.getSingleDevice(3)),
            map(device => new LoadSingleDeviceSuccess({device}))
        );

    constructor(
        private deviceService: DevicesService,
        private actions$: Actions
    ) {
    }
}
