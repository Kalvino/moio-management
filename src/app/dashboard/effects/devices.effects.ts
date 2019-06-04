import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DevicesApiActions, DevicesActions } from '../actions';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { IDevice } from '../models/device.model';
import { DevicesService } from '../services/devices.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
// import { DeviceFormComponent } from '../components/devices/device-form/device-form.component';
import { IPatient } from '../models/patient.model';
import { Update } from '@ngrx/entity';

/**
 * devices effects
 */
@Injectable()
export class DevicesEffects {

  /**
   * effect fired, when the create new device form is submitted
   * send data to api and handle result
   */
  @Effect()
  createDevice$ = this.actions$
    .pipe(
      ofType<DevicesActions.CreateDevice>(DevicesActions.DevicesActionTypes.CreateDevice),
      map(action => action.payload.device),
      exhaustMap((deviceData: IDevice) => {

        return this.devicesService.createDevice(deviceData)
          .pipe(
            // delay(2000),
            map(device => {
              console.log(device);
              return new DevicesApiActions.CreateDeviceSuccess({ device });
            }),
            catchError(httpResponse => {
              console.log(httpResponse);
              const messages = httpResponse.statusText.toLowerCase();

              return of(new DevicesApiActions.CreateDeviceFailure({ messages }));
            })
          );
      })
    );

  /**
   * send device data to api and handle result
   */

   
//   @Effect()
//   editDevice$ = this.actions$.pipe(
//     ofType<DevicesActions.EditDevice>(DevicesActions.DevicesActionTypes.EditDevice),
//     map(action => action.payload),
//     exhaustMap((device: Device) => {

//       return this.devicesService.updateDevice(device)
//         .pipe(
//           map((savedDevice: Device) => {
//             this.store.dispatch(new DevicesActions.DismissEditDevice());
//             return new DevicesApiActions.EditDeviceSuccess({ device: savedDevice });
//           }),
//           catchError(httpError => {
//             console.log(httpError);
//             const message = httpError.statusText.toLowerCase();

//             const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
//               duration: 10000
//             });

//             snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

//               if (snackBarDismiss.dismissedByAction) {
//                 this.store.dispatch(new DevicesActions.EditDevice(device));
//               } else {
//                 this.router.navigate(['/dashboard/devices']);
//               }
//             });

//             return of(new DevicesApiActions.LoadDevicePatientsFailure({ message }));
//           })
//         );
//     })
//   );

  /**
   * observes the CreateDeviceSuccess action
   * in case create device succeeds, the form dialog box is closed
   * and the devices list is shown
   */

//   @Effect({
//     dispatch: false
//   })
//   createDeviceSuccess$ = this.actions$
//     .pipe(
//       ofType(DevicesApiActions.DevicesApiActionTypes.CreateDeviceSuccess),
//       tap(() => {
//         this.dialog.getDialogById("deviceCreationForm").close();
//       })
//     );

  /**
   * observes the EditDeviceSuccess action
   * in case edit device succeeds, the list is reloaded
   */

//   @Effect({
//     dispatch: false
//   })
//   editDeviceSuccess$ = this.actions$
//     .pipe(
//       ofType(DevicesApiActions.DevicesApiActionTypes.EditDeviceSuccess),
//       tap(() => {
//         this.store.dispatch(new DevicesActions.LoadDevices());
//       })
//     );

  /**
   * effect for loading devices
   */
  @Effect()
  loadDevices = this.actions$
    .pipe(
      ofType<DevicesActions.LoadDevices>(DevicesActions.DevicesActionTypes.LoadDevices),
      exhaustMap(() => {

        return this.devicesService.getDevices()
          .pipe(
            //delay(2000),
            map((devices: IDevice[]) => {
              //console.log(devices);
              return new DevicesApiActions.LoadDevicesSuccess({ devices });
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();
              console.log(message)
              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction) {
                  this.store.dispatch(new DevicesActions.LoadDevices());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new DevicesApiActions.LoadDevicesFailure({ message }));
            })
          );
      })
    );


  /**
   * effect for loading device devices
   */
//   @Effect()
//   loadDevicePatients = this.actions$
//     .pipe(
//       ofType<DevicesActions.LoadDevicePatients>(DevicesActions.DevicesActionTypes.LoadDevicePatients),
//       map(action => action.payload),
//       exhaustMap((id: number) => {

//         return this.devicesService.getDevicePatients(id)
//           .pipe(
//             delay(2000),
//             map((patients: IPatient[]) => {
//               console.log(patients);

//               for (let key in patients) {
//                 const patient = patients[key];
//                 const device = patient.devices.filter(device => device.id === id);
//                 let permission = "";

//                 if (device[0].device_patient_permission == 1) {
//                   permission = "Administrator";
//                 } else {
//                   permission = "Read Only"
//                 }
//                 patient["permission"] = permission;
//               }

//               return new DevicesApiActions.LoadDevicePatientsSuccess({ patients });
//             }),
//             catchError(httpError => {
//               const message = httpError.statusText.toLowerCase();

//               const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
//                 duration: 10000
//               });

//               snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

//                 if (snackBarDismiss.dismissedByAction) {
//                   this.store.dispatch(new DevicesActions.LoadDevicePatients(id));
//                 } else {
//                   this.router.navigate(['/dashboard/devices']);
//                 }
//               });

//               return of(new DevicesApiActions.LoadDevicePatientsFailure({ message }));
//             })
//           );
//       })
//     );

  /**
   * show a dialog form for device details as a pop up
   */
//   @Effect()
//   popUpDeviceForm$ = this.actions$
//     .pipe(
//       ofType<DevicesActions.CreateDeviceFormDialog>(DevicesActions.DevicesActionTypes.CreateDeviceFormDialog),
//       exhaustMap(() => {
//         const title = 'Creating a new device';
//         const dialogRef: MatDialogRef<DeviceFormComponent> = this.dialog.open(DeviceFormComponent, {
//           width: '720px',
//           disableClose: true,
//           data: { title: title }
//         });

//         return dialogRef.afterClosed();
//       })
//     );


  /**
   * effect to dismiss the dialog for adding device details
   */
//   @Effect({
//     dispatch: false
//   })
//   DismissDeviceFormDialog = this.actions$
//     .pipe(
//       ofType(DevicesActions.DevicesActionTypes.DismissDeviceFormDialog),
//       map(() => {
//         this.dialog.getDialogById('deviceCreationForm').close();
//       })
//     );

  /**
   * constructor
   *
   * @param actions$
   * @param devicesService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private devicesService: DevicesService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }
}
