import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap, mergeMap, delay, exhaustMap} from 'rxjs/operators';
import {DevicesService} from '../../service/devices.service';
import {SocketService} from '../../service/socket.service';
import {DeviceSocketActionTypes, ConnectClient, DisconnectClient, Subscribe, Unsubscribe} from '../actions/device-socket.actions';

import {IPatient} from '../../../models/patient.model';
import * as UsersApiActions from '../../../actions/users-api.actions';
import * as UsersActions from '../../../actions/users.actions';

@Injectable()
export class DeviceSocketEffects {

    /**
     * connect to WS client for notifications
     */
    @Effect({
        dispatch: false
    })
    connectClient$ = this.actions$.pipe(
        ofType<ConnectClient>(DeviceSocketActionTypes.ConnectClient),
        tap(() => {
            this.socketService.connectClient();
        })
    );

    /**
     * disconnect WS client for notifications
     */
    @Effect({
        dispatch: false
    })
    disconnectClient$ = this.actions$.pipe(
        ofType<DisconnectClient>(DeviceSocketActionTypes.DisconnectClient),
        tap(() => {
            this.socketService.disconnectClient();
        })
    );

    /**
     * subscribe to notifications stream for a user id
     */
    @Effect({
        dispatch: false
    })
    subscribeDeviceLogs$ = this.actions$.pipe(
        ofType<Subscribe>(DeviceSocketActionTypes.Subscribe),
        delay(1000),
        map(action => action.payload),
        tap(payload => {
            this.socketService.subscribe(payload.deviceId);
        })
    );

    /**
     * unsubscribe to notifications stream for a user id
     */
    @Effect({
        dispatch: false
    })
    unsubscribeNotifications$ = this.actions$.pipe(
        ofType<Unsubscribe>(DeviceSocketActionTypes.Unsubscribe),
        map(action => action.payload.userId),
        tap(patientId => {
            this.socketService.unsubscribe('notifications', patientId);
        })
    );


    constructor(
        private deviceService: DevicesService,
        private socketService: SocketService,
        private actions$: Actions
    ) {
    }
}
