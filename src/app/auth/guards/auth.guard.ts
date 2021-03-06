import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../reducers';
import { AuthApiActions } from '../actions';

/**
 * Gaurd to check if a user
 * is logged in
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.isLoggedIn),
      map(authed => {

        if (!authed) {
          this.store.dispatch(new AuthApiActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
