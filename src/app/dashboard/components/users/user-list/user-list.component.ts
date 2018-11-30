import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';

import { User } from '../../../models/user.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as userActions from '../../../actions/users.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  displayedColumns: string[] = ['name', 'nursing-home', 'email', 'username'];

  // Used to select user in the list
  selectedUser: User | null;
  componentActive = true;

  columns = [
    {
      prop: 'firstname',
      name: 'First Name'
    },
    {
      prop: 'lastname',
      name: 'Last Name'
    },
    {
      prop: 'nursing_home_id',
      name: 'Nursing Home'
    },
    {
      prop: 'email',
      name: 'Email'
    },
    {
      prop: 'username',
      name: 'Username'
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

  // get any error
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getUserPageError)
  );

  /**
   * constructor
   * @param store
   * 
   */
  constructor(private store: Store<fromDashboard.State>) { 

  }

  ngOnInit(): void {

    this.store.dispatch(new userActions.LoadUsers());

    this.store.pipe(select(fromDashboard.getUsersIds))
    .subscribe((ids: string[]) => this.ids = ids);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  newUser(): void {
    this.store.dispatch(new userActions.InitializeUser());
  }

  selectUser(user: User): void {
    this.store.dispatch(new userActions.SelectUser(user));
  }
}
