import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersApiActions, UsersActions } from '../actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Update } from '@ngrx/entity';

/**
 * users effects
 */
@Injectable()
export class UsersEffects {

  /**
   * effect fired, when the creato new user form is submitted
   * send data to api and handle result
   */
  @Effect()
  createUser$ = this.actions$
    .pipe(
      ofType<UsersActions.CreateUser>(UsersActions.UsersActionTypes.CreateUser),
      map(action => action.payload.user),
      exhaustMap((userData: User) => {

        // dispatch showLoader action

        return this.userService.createUser(userData)
          .pipe(
            map(user => {
              return new UsersApiActions.CreateUserSuccess({ user });
            }),
            catchError(httpResponse => {
              const message = [];

              return of(new UsersApiActions.CreateUserFailure({ message }));
            }),
            tap(() => {
              console.log('Actions finished')
              // dispatch hideLoader action
            })
          );
      })
    );


  /**
   * effect for loading users
   */
  @Effect()
  loadUsers = this.actions$
    .pipe(
      ofType<UsersActions.LoadUsers>(UsersActions.UsersActionTypes.LoadUsers),
      exhaustMap(() => {

        // dispatch showLoader action

        return this.usersService.getUsers()
          .pipe(
            map((users: User[]) => {
              console.log(users)
              return new UsersApiActions.LoadUsersSuccess({users});
            }),
            catchError(httpError => {
              const message = httpError.error.message.toLowerCase();
              return of(new UsersApiActions.LoadUsersFailure({ message }));
            }),
            tap(() => {
              console.log('Actions finished')
              // dispatch hideLoader action
            })
          );
      })
    );

  /**
   * constructor
   *
   * @param actions$
   * @param userService
   * @param usersService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private usersService: UsersService,
    private router: Router,
    private store: Store<any>) {
  }
}
