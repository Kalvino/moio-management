import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, exhaustMap, map, tap } from 'rxjs/operators';
import { ICredentials } from '../models/user.interface';
import { AuthApiService } from '../services/auth-api.service';
import { AuthApiActions, AuthActions, AuthPageActions } from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../core/services/confirm.service';

/**
 * Authentication effects
 * provided in root
 * bundles effects for the Authentication Module
 */
@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  /**
   * login effect
   * listen to action Login. Will trigger the login API
   */
  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<AuthPageActions.Login>(AuthPageActions.AuthPageActionTypes.Login),
      delay(3000),
      map(action => action.payload.credentials),
      exhaustMap((credentials: ICredentials) => {
        return this.authApiService
          .login(credentials)
          .pipe(
            map(response => new AuthApiActions.LoginSuccess({response})),
            catchError(response => {
              const message = response.statusText.toLowerCase();
              return of(new AuthApiActions.LoginFailure({message}));
            })
          );
      })
    );

  /**
   * effect when API returns a successful login
   */
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

  /**
   * effect on login redirect
   * redirect to the login page
   */
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
              const message = httpResponse.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction) {
                  this.store.dispatch(new AuthActions.Logout());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new AuthApiActions.LogoutFailure({message}));
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
        return this.confirmService.confirm({title: this.translate.instant("Logout"), 
          message: this.translate.instant("Auth.ConfirmLogoutMessage")});
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
   * @param store ngrx store
   * @param snackBar material snackbar
   * @param translate translate service
   * @param confirmService ConfirmService

   */
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private confirmService: ConfirmService) {
  }
}
