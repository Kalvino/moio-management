import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, exhaustMap, map, tap } from 'rxjs/operators';
import { Credentials } from '../models/user.interface';
import { AuthApiService } from '../services/auth-api.service';
import { AuthApiActions, AuthActions, AuthPageActions } from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LogoutConfirmationDialogComponent } from '../components/dialogs/logout-confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<AuthPageActions.Login>(AuthPageActions.AuthPageActionTypes.Login),
      delay(3000),
      map(action => action.payload.credentials),
      exhaustMap((credentials: Credentials) => {
        return this.authApiService
          .login(credentials)
          .pipe(
            map(response => new AuthApiActions.LoginSuccess({response})),
            catchError(response => {
              console.log(response);
              console.log(response.message);
              const message = response.statusText.toLowerCase();
              return of(new AuthApiActions.LoginFailure({message}));
            }),
            tap(() => {
              console.log('complete!');
            })
          );
      })
    );

  @Effect({
    dispatch: false
  })
  loginSuccess$ = this.actions$
    .pipe(
      ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    );

  @Effect({
    dispatch: false
  })
  loginRedirect$ = this.actions$
    .pipe(
      ofType(
        AuthApiActions.AuthApiActionTypes.LoginRedirect,
        AuthApiActions.AuthApiActionTypes.LogoutSuccess
      ),
      tap(() => {
        this.router.navigate(['/auth/signin']);
      })
    );

  /**
   * logout effect
   * starts the logout process from the API
   * in case of LogoutSuccess
   */
  @Effect()
  logout$ = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.Logout),
      exhaustMap(() => {

        return this.authApiService
          .logout()
          .pipe(
            map(() => new AuthApiActions.LogoutSuccess()),
            catchError(httpResponse => {
              console.log(httpResponse.message);
              const message = httpResponse.statusText.toLowerCase();

              let snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new AuthActions.Logout());
                }else{
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new AuthApiActions.LogoutFailure({message}));
            }),
            tap(() => {
              console.log('complete!');
            })
          );
      })
    );

  /**
   * show a dialog to logout
   */
  @Effect()
  logoutConfirmation$ = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.LogoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog
          .open<LogoutConfirmationDialogComponent, undefined, boolean>(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(result =>
        result
          ? new AuthActions.Logout()
          : new AuthActions.LogoutConfirmationDismiss()
      )
    );

  /**
   * constructor
   * @param actions$ actions
   * @param authApiService service encapsulating api calls
   * @param router the router
   * @param dialog material dialog service
   * @param store ngrx store
   * @param snackbar material snackbar 
   */
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }
}
