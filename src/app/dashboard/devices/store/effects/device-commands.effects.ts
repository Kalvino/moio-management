import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';
import {DeviceCommandsActionTypes, LoadAllDeviceCommandsRequest, LoadAllDeviceCommandsSuccess} from '../actions/device-commands.actions';


@Injectable()
export class DeviceCommandsEffects {

    @Effect()
    loadAllDeviceCommands$ = this.actions$
        .pipe(
            ofType<LoadAllDeviceCommandsRequest>(DeviceCommandsActionTypes.LoadAllDeviceCommandsRequest),
            mergeMap(() => this.deviceService.getAllDeviceCommands()),
            map(deviceCommands => new LoadAllDeviceCommandsSuccess({deviceCommands}))
        );

    constructor(
        private deviceService: DevicesService,
        private actions$: Actions
    ) {
    }
}
