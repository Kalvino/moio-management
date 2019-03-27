// import {Injectable} from '@angular/core';
// import {Actions, Effect, ofType} from '@ngrx/effects';
// import {of} from 'rxjs';
// import {catchError, map, switchMap, tap, mergeMap, delay, exhaustMap} from 'rxjs/operators';
// import {DevicesService} from '../../service/devices.service';
// import {SocketService} from '../../service/socket.service';
//
//
// import {
//     DeviceReportsActionTypes,
//     ConnectClient,
//     DisconnectClient,
//     Subscribe,
//     Unsubscribe
// } from '../actions/device-reports.actions';
// import {IPatient} from '../../../models/patient.model';
// import * as UsersApiActions from '../../../actions/users-api.actions';
// import * as UsersActions from '../../../actions/users.actions';
//
//
// @Injectable()
// export class DeviceReportsEffects {
//
//     // @Effect({
//     //     dispatch: false
//     // })
//     // connectClient$ = this.actions$.pipe(
//     //     ofType<ConnectClient>(DeviceReportsActionTypes.ConnectClient),
//     //     map(action => action.payload.namespace),
//     //     tap((namespace) => {
//     //         this.socketService.connectClient(namespace);
//     //     })
//     // );
//     //
//     // @Effect({
//     //     dispatch: false
//     // })
//     // disconnectClient$ = this.actions$.pipe(
//     //     ofType<DisconnectClient>(DeviceReportsActionTypes.DisconnectClient),
//     //     tap(() => {
//     //         this.socketService.disconnectClient('device_reports');
//     //     })
//     // );
//
//     // @Effect({
//     //     dispatch: false
//     // })
//     // subscribeDeviceLogs$ = this.actions$.pipe(
//     //     ofType<Subscribe>(DeviceReportsActionTypes.Subscribe),
//     //     delay(1000),
//     //     map(action => action.payload.deviceId),
//     //     tap(deviceId => {
//     //         this.socketService.subscribe('device_reports', deviceId);
//     //     })
//     // );
//     //
//     // @Effect({
//     //     dispatch: false
//     // })
//     // unsubscribeNotifications$ = this.actions$.pipe(
//     //     ofType<Unsubscribe>(DeviceReportsActionTypes.Unsubscribe),
//     //     map(action => action.payload.userId),
//     //     tap(patientId => {
//     //         this.socketService.unsubscribe('device_reports', patientId);
//     //     })
//     // );
//
//
//     constructor(
//         private deviceService: DevicesService,
//         private socketService: SocketService,
//         private actions$: Actions
//     ) {
//     }
// }
