import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PatientsApiActions, PatientsActions } from '../actions';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { IPatient } from '../models/patient.model';
import { PatientsService } from '../services/patients.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { PatientFormComponent } from '../components/patients/patient-form/patient-form.component';

/**
 * patients effects
 */
@Injectable()
export class PatientsEffects {

  /**
   * effect fired, when the create new patient form is submitted
   * send data to api and handle result
   */
  @Effect()
  createPatient$ = this.actions$
    .pipe(
      ofType<PatientsActions.CreatePatient>(PatientsActions.PatientsActionTypes.CreatePatient),
      map(action => action.payload.patient),
      exhaustMap((patientData: IPatient) => {

        return this.patientsService.createPatient(patientData)
          .pipe(
            // delay(2000),
            map(patient => {
              console.log(patient);
              return new PatientsApiActions.CreatePatientSuccess({patient});
            }),
            catchError(httpResponse => {
              console.log(httpResponse);
              const messages = httpResponse.statusText.toLowerCase();

              return of(new PatientsApiActions.CreatePatientFailure({messages}));
            })
          );
      })
    );

  /**
   * observes the CreatePatientSuccess action
   * in case create patient succeeds, the form dialog box is closed
   * and the patients list is shown
   */
  @Effect({
    dispatch: false
  })
  createPatientSuccess$ = this.actions$
    .pipe(
      ofType(PatientsApiActions.PatientsApiActionTypes.CreatePatientSuccess),
      tap(() => {
        this.dialog.getDialogById("patientCreationForm").close();
        this.store.dispatch(new PatientsActions.LoadPatients());
      })
    );

  /**
   * effect for loading patients
   */
  @Effect()
  loadPatients = this.actions$
    .pipe(
      ofType<PatientsActions.LoadPatients>(PatientsActions.PatientsActionTypes.LoadPatients),
      exhaustMap(() => {

        return this.patientsService.getPatients()
          .pipe(
            //delay(2000),
            map((patients: IPatient[]) => {
              return new PatientsApiActions.LoadPatientsSuccess({patients});
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new PatientsActions.LoadPatients());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new PatientsApiActions.LoadPatientsFailure({message}));
            })
          );
      })
    );

  /**
   * show a dialog form for patient details as a pop up
   */
  @Effect()
  popUpPatientForm$ = this.actions$
    .pipe(
      ofType<PatientsActions.CreatePatientFormDialog>(PatientsActions.PatientsActionTypes.CreatePatientFormDialog),
      exhaustMap(() => {
        const title = 'Creating a new patient';
        const dialogRef: MatDialogRef<PatientFormComponent> = this.dialog.open(PatientFormComponent, {
          width: '720px',
          disableClose: true,
          data: { title: title }
        });
        
        return dialogRef.afterClosed();
      })
    );


  /**
   * effect to dismiss the dialog for adding patient details
   */
  @Effect({
    dispatch: false
  })
  DismissPatientFormDialog = this.actions$
    .pipe(
      ofType(PatientsActions.PatientsActionTypes.DismissPatientFormDialog),
      map(() => {
        this.dialog.getDialogById('patientCreationForm').close();
      })
    );

  /**
   * constructor
   *
   * @param actions$
   * @param patientsService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private patientsService: PatientsService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }
}
