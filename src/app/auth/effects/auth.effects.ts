import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthPageActions } from '../actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Credentials } from '../models/user.interface';
import { AuthApiService } from '../services/auth-api.service';
import { AuthApiActions, AuthActions, AuthPageActions } from '../actions';
import { of } from 'rxjs';

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

  /**
   * logout effect
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

  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService) {
  }
}
