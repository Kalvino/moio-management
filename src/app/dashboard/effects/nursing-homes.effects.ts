import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NursingHomesApiActions, NursingHomesActions } from '../actions';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { NursingHome } from '../models/nursing-home.model';
import { NursingHomesService } from '../services/nursing-homes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { NursingHomeFormComponent } from '../components/nursing-homes/nursing-home-form/nursing-home-form.component';
import { Geofencing } from '../models/nursing-home-geofencing.model';

/**
 * nursingHomes effects
 */
@Injectable()
export class NursingHomesEffects {

  /**
   * effect fired, when the create new nursingHome form is submitted
   * send data to api and handle result
   */
  @Effect()
  createNursingHome$ = this.actions$
    .pipe(
      ofType<NursingHomesActions.CreateNursingHome>(NursingHomesActions.NursingHomesActionTypes.CreateNursingHome),
      map(action => action.payload.nursingHome),
      exhaustMap((nursingHomeData: NursingHome) => {

        return this.nursingHomesService.createNursingHome(nursingHomeData)
          .pipe(
            delay(2000),
            map(nursingHome => {
              return new NursingHomesApiActions.CreateNursingHomeSuccess({ nursingHome });
            }),
            catchError(httpResponse => {
              const message = httpResponse.statusText.toLowerCase();

              return of(new NursingHomesApiActions.CreateNursingHomeFailure({ message }));
            }),
            tap(() => {
              console.log('Actions finished')
            })
          );
      })
    );

  /**
   * effect for loading nursing homes
   */
  @Effect()
  loadNursingHomes$ = this.actions$
    .pipe(
      ofType<NursingHomesActions.LoadNursingHomes>(NursingHomesActions.NursingHomesActionTypes.LoadNursingHomes),
      exhaustMap(() => {

        return this.nursingHomesService.getNursingHomes()
          .pipe(
            delay(2000),
            map((nursingHomes: NursingHome[]) => {
              return new NursingHomesApiActions.LoadNursingHomesSuccess({ nursingHomes });
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              let snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction) {
                  this.store.dispatch(new NursingHomesActions.LoadNursingHomes());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new NursingHomesApiActions.LoadNursingHomesFailure({ message }));
            }),
            tap(() => {
              console.log('Actions finished')
              // dispatch hideLoader action
            })
          );
      })
    );

  /**
   * show a dialog form for nursingHome details as a pop up
   */
  @Effect()
  popUpNursingHomeForm$ = this.actions$
    .pipe(
      ofType<NursingHomesActions.PopUpNursingHomeForm>(NursingHomesActions.NursingHomesActionTypes.PopUpNursingHomeForm),
      exhaustMap(() => {
        const title = 'Creating a new nursingHome';
        const dialogRef: MatDialogRef<NursingHomeFormComponent> = this.dialog.open(NursingHomeFormComponent, {
          width: '720px',
          disableClose: true,
          data: { title: title }
        });

        return dialogRef.afterClosed();
      })
    );


  /**
   * effect to dismiss the dialog for adding nursingHome details
   */
  @Effect({
    dispatch: false
  })
  DismissNewNursingHome = this.actions$
    .pipe(
      ofType(NursingHomesActions.NursingHomesActionTypes.DismissNewNursingHome),
      map(() => {
        this.dialog.closeAll();
      })
    );


  /**
   * effect to dismiss the dialog for adding nursingHome Geofencing details
   */
  @Effect({
    dispatch: false
  })
  DismissNewNursingHomeGeofencing = this.actions$
    .pipe(
      ofType(NursingHomesActions.NursingHomesActionTypes.DismissNewNursingHomeGeofencing),
      map(() => {
        this.dialog.closeAll();
      })
    );


  /**
   * effect for loading nursinghome geofencing
   */
  @Effect()
  loadNursingHomeGeofencing = this.actions$
    .pipe(
      ofType<NursingHomesActions.LoadNursingHomeGeofencing>(NursingHomesActions.NursingHomesActionTypes.LoadNursingHomeGeofencing),
      map(action => action.payload),
      exhaustMap((id: number) => {

        return this.nursingHomesService.getNursingHomeGeofencing(id)
          .pipe(
            delay(2000),
            map((geofencing: Geofencing[]) => {
              return new NursingHomesApiActions.LoadNursingHomeGeofencingSuccess({ geofencing });
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();
              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction) {
                  this.store.dispatch(new NursingHomesActions.LoadNursingHomeGeofencing(id));
                } else {
                  this.router.navigate(['/dashboard/nursinghomes']);
                }
              });

              return of(new NursingHomesApiActions.LoadNursingHomeGeofencingFailure({ message }));
            })
          );
      })
    );



  /**
     * effect fired, when the create new geofence form is submitted
     * send data to api and handle result
     */
  @Effect()
  createGeofence$ = this.actions$
    .pipe(
      ofType<NursingHomesActions.CreateNursingHomeGeofencing>(NursingHomesActions.NursingHomesActionTypes.CreateNursingHomeGeofencing),
      map(action => action.payload.geofencing),
      exhaustMap((geofence: Geofencing) => {

        return this.nursingHomesService.createNursingHomeGeofencing(geofence)
          .pipe(
            map(geofencing => {
              return new NursingHomesApiActions.CreateNursingHomeGeofencingSuccess({ geofencing });
            }),
            catchError(httpError => {
              console.log(httpError);

              const message = httpError.statusText.toLowerCase();

              return of(new NursingHomesApiActions.CreateNursingHomeGeofencingFailure({ message }));
            })
          );
      })
    );



  /**
     * send geofence data to api and handle result
     */
  @Effect()
  editGeofence$ = this.actions$.pipe(
    ofType<NursingHomesActions.EditNursingHomeGeofencing>(NursingHomesActions.NursingHomesActionTypes.EditNursingHomeGeofencing),
    map(action => action.payload),
    exhaustMap((geofence: Geofencing) => {

      return this.nursingHomesService.updateNursingHomeGeofencing(geofence)
        .pipe(
          map((geofencing: Geofencing) => {
            this.store.dispatch(new NursingHomesActions.DismissEditNursingHomeGeofencing());
            return new NursingHomesApiActions.EditNursingHomeGeofencingSuccess({ geofencing });
          }),
          catchError(httpError => {
            console.log(httpError);
            const message = httpError.statusText.toLowerCase();

            const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
              duration: 10000
            });

            snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

              if (snackBarDismiss.dismissedByAction) {
                this.store.dispatch(new NursingHomesActions.EditNursingHomeGeofencing(geofence));
              } else {
                this.router.navigate(['/dashboard/nursing-homes']);
              }
            });

            return of(new NursingHomesApiActions.EditNursingHomeGeofencingFailure({ message }));
          })
        );
    })
  );




  /**
   * constructor
   *
   * @param actions$
   * @param nursingHomesService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private nursingHomesService: NursingHomesService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog, ) {
  }
}
