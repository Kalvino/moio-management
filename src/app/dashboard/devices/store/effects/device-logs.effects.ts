import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap, mergeMap, delay, exhaustMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';
import {SocketService} from '../../service/socket.service';


import {
    DeviceLogsActionTypes,
    LoadAllDeviceLogsRequest,
    LoadAllDeviceLogsFailure,
    LoadAllDeviceLogsSuccess
} from '../actions/device-logs.actions';
import {IPatient} from '../../../models/patient.model';
import * as UsersApiActions from '../../../actions/users-api.actions';
import * as UsersActions from '../../../actions/users.actions';


@Injectable()
export class DeviceLogsEffects {

    @Effect()
    loadAllDeviceLogs$ = this.actions$
        .pipe(
            ofType<LoadAllDeviceLogsRequest>(DeviceLogsActionTypes.LoadAllDeviceLogsRequest),
            map(action => action.deviceId),
            exhaustMap((deviceId: number) => {

                    return this.deviceService.getAllDeviceLogs(deviceId)
                        .pipe(
                            map(deviceLogs => new LoadAllDeviceLogsSuccess({deviceLogs}))
                        );
                }
            ));

    // /**
    //  * connect to WS client for notifications
    //  */
    // @Effect({
    //     dispatch: false
    // })
    // connectClient$ = this.actions$.pipe(
    //     ofType<ConnectClient>(DeviceLogsActionTypes.ConnectClient),
    //     map(action => action.payload.namespace),
    //     tap((namespace) => {
    //         this.socketService.connectClient(namespace);
    //     })
    // );
    //
    // /**
    //  * disconnect WS client for notifications
    //  */
    // @Effect({
    //     dispatch: false
    // })
    // disconnectClient$ = this.actions$.pipe(
    //     ofType<DisconnectClient>(DeviceLogsActionTypes.DisconnectClient),
    //     map(action => action.payload.namespace),
    //     tap((namespace) => {
    //         this.socketService.disconnectClient(namespace);
    //     })
    // );
    //
    // /**
    //  * subscribe to notifications stream for a user id
    //  */
    // @Effect({
    //     dispatch: false
    // })
    // subscribeDeviceLogs$ = this.actions$.pipe(
    //     ofType<Subscribe>(DeviceLogsActionTypes.Subscribe),
    //     delay(1000),
    //     map(action => action.payload),
    //     tap(payload => {
    //         this.socketService.subscribe(payload.namespace, payload.deviceId);
    //     })
    // );
    //
    // /**
    //  * unsubscribe to notifications stream for a user id
    //  */
    // @Effect({
    //     dispatch: false
    // })
    // unsubscribeNotifications$ = this.actions$.pipe(
    //     ofType<Unsubscribe>(DeviceLogsActionTypes.Unsubscribe),
    //     map(action => action.payload.userId),
    //     tap(patientId => {
    //         this.socketService.unsubscribe('notifications', patientId);
    //     })
    // );


    constructor(
        private deviceService: DevicesService,
        private socketService: SocketService,
        private actions$: Actions
    ) {
    }
}
