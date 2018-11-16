import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Credentials } from '../models/user.interface';
import { AuthApiService } from '../services/auth-api.service';
import { AuthApiActions, AuthActions, AuthPageActions } from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogoutConfirmationDialogComponent } from '../components/dialogs/logout-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<AuthPageActions.Login>(AuthPageActions.AuthPageActionTypes.Login),
      map(action => action.payload.credentials),
      exhaustMap((credentials: Credentials) => {
        // TODO implement a LOADER

        return this.authApiService
          .login(credentials)
          .pipe(
            map(response => new AuthApiActions.LoginSuccess({response})),
            catchError(response => {
              const message = response.error.error.toLowerCase();
              return of(new AuthApiActions.LoginFailure({message}));
            }),
            tap(() => {
              // TODO: disable Loader
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

        // TODO: show Loader

        return this.authApiService
          .logout()
          .pipe(
            map(() => new AuthApiActions.LogoutSuccess()),
            catchError(httpResponse => {
              const message = httpResponse.error.error.toLowerCase();
              return of(new AuthApiActions.LogoutFailure({message}));
            }),
            tap(() => {
              // TODO disable Loader
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
   */
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private router: Router,
    private dialog: MatDialog) {
  }
}
