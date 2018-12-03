import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';


import { User } from '../../../models/user.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as userActions from '../../../actions/users.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'moio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  pageTitle = 'Users';

  displayCode: boolean;

  users: User[];
  // displayedColumns: string[] = ['name', 'nursing_home', 'registered_on', 'last_login', 'patient_profiles'];

  // Used to select user in the list
  selectedUser: User | null;
  componentActive = true;

  /**
   * Users Table columns
   */

  columns = [
    {
      prop: 'name',
      name: this.translate.instant('Name')
    },
    {
      prop: 'nursing_home',
      name: this.translate.instant('NursingHome')
    },
    {
      prop: 'registered_on',
      name: this.translate.instant('RegisteredOn')
    },
    {
      prop: 'last_login',
      name: this.translate.instant('LastLoginOn')
    },
    {
      prop: 'patient_profiles',
      name: this.translate.instant('PatientProfiles')
    }
  ];

  ids: string[];
  
  // all users
  users$: Observable<User[]> = this.store.pipe(
    select(fromDashboard.getAllUsers)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getUserPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getUserPageError)
  );

  /**
   * constructor
   * @param store
   * 
   */
  constructor(private store: Store<fromDashboard.State>, 
    private translate: TranslateService) { 

  }

   /**
   * init UserListComponent component
   */
  ngOnInit(): void {

    this.store.dispatch(new userActions.LoadUsers());

    this.store.pipe(select(fromDashboard.getUsersIds))
    .subscribe((ids: string[]) => this.ids = ids);
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Create User action
  newUser(): void {
    this.store.dispatch(new userActions.InitializeUser());
  }

  // Select user action
  selectUser(user: User): void {
    this.store.dispatch(new userActions.SelectUser(user));
  }
}
