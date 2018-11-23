import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import * as usersActions from '../actions/users.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { of } from 'rxjs';
import { allUsersLoaded } from '../reducers/users.selector';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
    private userService: UsersService) { }

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.LoadUsers),
    mergeMap((action: usersActions.LoadUsers) => this.userService.getUsers().pipe(
      map((users: User[]) => {
        console.log(users);
        const success = new usersActions.LoadUsersSuccess(users);
        return success;
      }),
      catchError(err => of(new usersActions.LoadUsersFail(err)))
    ))
  );
}
