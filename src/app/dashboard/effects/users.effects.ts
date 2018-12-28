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
import { IPatient } from '../models/patient.model';
import { Update } from '@ngrx/entity';

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

        return this.usersService.createUser(userData)
          .pipe(
            // delay(2000),
            map(user => {
              console.log(user);
              return new UsersApiActions.CreateUserSuccess({user});
            }),
            catchError(httpResponse => {
              console.log(httpResponse);
              const messages = httpResponse.statusText.toLowerCase();

              return of(new UsersApiActions.CreateUserFailure({messages}));
            })
          );
      })
    );

  /**
   * send user data to api and handle result
   */
  @Effect()
  editUser$ = this.actions$.pipe(
    ofType<UsersActions.EditUser>(UsersActions.UsersActionTypes.EditUser),
    map(action => action.payload),
    exhaustMap((user: User) => {

      return this.usersService.updateUser(user)
        .pipe(
          map((savedUser: User) => {
            this.store.dispatch(new UsersActions.DismissEditUser());
            return new UsersApiActions.EditUserSuccess({user: savedUser});
          }),
          catchError(httpError => {
            console.log(httpError);
              const message = httpError.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new UsersActions.EditUser(user));
                } else {
                  this.router.navigate(['/dashboard/users']);
                }
              });

              return of(new UsersApiActions.LoadUserPatientsFailure({message}));
            })
        );
    })
  );

  /**
   * observes the CreateUserSuccess action
   * in case create user succeeds, the form dialog box is closed
   * and the users list is shown
   */
  @Effect({
    dispatch: false
  })
  createUserSuccess$ = this.actions$
    .pipe(
      ofType(UsersApiActions.UsersApiActionTypes.CreateUserSuccess),
      tap(() => {
        this.store.dispatch(new UsersActions.LoadUsers());
        this.dialog.getDialogById("userCreationForm").close();
      })
    );

  /**
   * observes the EditUserSuccess action
   * in case edit user succeeds, the list is reloaded
   */
  @Effect({
    dispatch: false
  })
  editUserSuccess$ = this.actions$
    .pipe(
      ofType(UsersApiActions.UsersApiActionTypes.EditUserSuccess),
      tap(() => {
        this.store.dispatch(new UsersActions.LoadUsers());
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
            //delay(2000),
            map((users: User[]) => {
              return new UsersApiActions.LoadUsersSuccess({users});
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new UsersActions.LoadUsers());
                } else {
                  this.router.navigate(['/dashboard']);
                }
              });

              return of(new UsersApiActions.LoadUsersFailure({message}));
            })
          );
      })
    );


  /**
   * effect for loading user users
   */
  @Effect()
  loadUserPatients = this.actions$
    .pipe(
      ofType<UsersActions.LoadUserPatients>(UsersActions.UsersActionTypes.LoadUserPatients),
      map(action => action.payload),
      exhaustMap((id: number) => {

        return this.usersService.getUserPatients(id)
          .pipe(
            delay(2000),
            map((patients: IPatient[]) => {
              console.log(patients);
              return new UsersApiActions.LoadUserPatientsSuccess({patients});
            }),
            catchError(httpError => {
              const message = httpError.statusText.toLowerCase();

              const snackBarRef = this.snackBar.open(this.translate.instant(message), this.translate.instant('Retry'), {
                duration: 10000
              });

              snackBarRef.afterDismissed().subscribe(snackBarDismiss => {

                if (snackBarDismiss.dismissedByAction){
                  this.store.dispatch(new UsersActions.LoadUserPatients(id));
                } else {
                  this.router.navigate(['/dashboard/users']);
                }
              });

              return of(new UsersApiActions.LoadUserPatientsFailure({message}));
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
      ofType<UsersActions.CreateUserFormDialog>(UsersActions.UsersActionTypes.CreateUserFormDialog),
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
  DismissUserFormDialog = this.actions$
    .pipe(
      ofType(UsersActions.UsersActionTypes.DismissUserFormDialog),
      map(() => {
        this.dialog.getDialogById('userCreationForm').close();
      })
    );



  /**
   * constructor
   *
   * @param actions$
   * @param usersService
   * @param router
   * @param modalController
   * @param store
   */
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router,
    private store: Store<any>,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }
}
