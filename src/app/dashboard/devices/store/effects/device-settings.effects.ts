import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap, mergeMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';
import {IDevice} from '../../model/device.model';
import * as deviceAction from '../actions/device.actions';


import {
    DeviceSettingsActionTypes,
    LoadAllDeviceSettingsRequest,
    LoadAllDeviceSettingsFailure,
    LoadAllDeviceSettingsSuccess,
} from '../actions/device-settings.actions';
import {LoadSingleDeviceSuccess} from '../actions/device.actions';


@Injectable()
export class DeviceSettingsEffects {

    @Effect()
    loadAllDeviceSettings$ = this.actions$
        .pipe(
            ofType<LoadAllDeviceSettingsRequest>(DeviceSettingsActionTypes.LoadAllDeviceSettingsRequest),
            mergeMap(() => this.deviceService.getAllDeviceSettings()),
            map(deviceSettings => new LoadAllDeviceSettingsSuccess({deviceSettings}))
        );

    constructor(
        private deviceService: DevicesService,
        private actions$: Actions
    ) {
    }
}
