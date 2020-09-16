import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ReportsApiActions, ReportsActions } from '../actions';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { Report } from '../models/report.model';
import { ReportsService } from '../services/reports.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { IPatient } from '../models/patient.model';
import { Update } from '@ngrx/entity';

/**
 * reports effects
 */
@Injectable()
export class ReportsEffects {

  /**
   * effect for loading reports
   */
  @Effect()
  loadReports = this.actions$
    .pipe(
      ofType<ReportsActions.LoadReports>(ReportsActions.ReportsActionTypes.LoadReports),
      exhaustMap(() => {

        return this.reportsService.getReports()
          .pipe(
            //delay(2000),
            map((reports: Report[]) => {
              console.log(reports);
              return new ReportsApiActions.LoadReportsSuccess({reports});
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new ReportsActions.LoadReports());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new ReportsApiActions.LoadReportsFailure({message}));
            })
          );
      })
    );

  /**
   * constructor
   *
   * @param actions$
   * @param reportsService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private reportsService: ReportsService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }
}
