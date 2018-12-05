import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersApiActions, UsersActions } from '../actions';
import { catchError, exhaustMap, map, tap, delay } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { UserFormComponent } from '../components/users/user-form/user-form.component';

/**
 * users effects
 */
@Injectable()
export class UsersEffects {

  /**
   * effect fired, when the create new user form is submitted
   * send data to api and handle result
   */
  @Effect()
  createUser$ = this.actions$
    .pipe(
      ofType<UsersActions.CreateUser>(UsersActions.UsersActionTypes.CreateUser),
      map(action => action.payload.user),
      exhaustMap((userData: User) => {

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

        return this.usersService.getUsers()
          .pipe(
            delay(2000),
            map((users: User[]) => {
              console.log(users)
              return new UsersApiActions.LoadUsersSuccess({users});
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              let snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new UsersActions.LoadUsers());
                }else{
                  this.router.navigate(['/dashboard']);
                }
              });

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
   * show a dialog form for user details as a pop up
   */
  @Effect()
  popUpUserForm$ = this.actions$
    .pipe(
      ofType<UsersActions.PopUpUserForm>(UsersActions.UsersActionTypes.PopUpUserForm),
      exhaustMap(() => {
        const title = 'Creating a new user';
        const dialogRef: MatDialogRef<UserFormComponent> = this.dialog.open(UserFormComponent, {
          width: '720px',
          disableClose: true,
          data: { title: title }
        });
        
        return dialogRef.afterClosed();
      })
    );


  /**
   * effect to dismiss the dialog for adding user details
   */
  @Effect({
    dispatch: false
  })
  DismissPoppedUpUserForm = this.actions$
    .pipe(
      ofType(UsersActions.UsersActionTypes.DismissPoppedUpUserForm),
      map(() => {
        this.dialog.closeAll();
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
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog,){
  }
}
