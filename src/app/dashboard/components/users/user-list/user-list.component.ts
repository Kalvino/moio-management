import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../../../reducers/users.reducer';
import * as userActions from '../../../actions/users.actions';
import * as usersSelector from '../../../reducers/users.selector';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'moio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  pageTitle = 'Users';
  errorMessage: string;
  errorMessage$: Observable<string>;

  displayCode: boolean;

  users: User[];

  // Used to highlight the selected user in the list
  selectedUser: User | null;
  componentActive = true;

  constructor(private store: Store<fromUsers.UsersState>,
    private usersService: UsersService) { }

  ngOnInit(): void {

    // this.errorMessage$ = this.store.pipe(select(fromUsers.));
    this.store.dispatch(new userActions.LoadUsers());
    this.store.pipe(select(usersSelector.selectAllUsers),
      takeWhile(() => this.componentActive))
      .subscribe((users: User[]) => this.users = users);

      console.log(this.users);
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
