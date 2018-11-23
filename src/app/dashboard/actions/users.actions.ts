import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UsersActionTypes {
  SelectUser = '[User] Set Current User',
  ClearSelectedUser = '[User] Clear Current User',
  InitializeUser = '[User] Initialize Current User',
  AddUser = '[User] Add User',
  AddUserSuccess = '[User] Add User Success',
  AddUserFail = '[User] Add User Fail',
  RemoveUser = '[User] Remove User',
  RemoveUserSuccess = '[User] Remove User Success',
  RemoveUserFail = '[User] Remove User Fail',
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load users Success',
  LoadUsersFail = '[User] Load Users Fail',
  SearchUser = '[User] Search User',
  SearchUserComplete = '[User] Search User Complete'
}


/**
 * Add User Actions
 */
export class SelectUser implements Action {
  readonly type = UsersActionTypes.SelectUser;

  constructor(public payload: User) { }
}

export class ClearSelectedUser implements Action {
  readonly type = UsersActionTypes.ClearSelectedUser;
}

export class InitializeUser implements Action {
  readonly type = UsersActionTypes.InitializeUser;
}

/**
 * Add User Actions
 */
export class AddUser implements Action {
  readonly type = UsersActionTypes.AddUser;

  constructor(public payload: User) { }
}

export class AddUserSuccess implements Action {
  readonly type = UsersActionTypes.AddUserSuccess;

  constructor(public payload: User) { }
}

export class AddUserFail implements Action {
  readonly type = UsersActionTypes.AddUserFail;

  constructor(public payload: User) { }
}


/**
 * Remove User Actions
 */
export class RemoveUser implements Action {
  readonly type = UsersActionTypes.RemoveUser;

  constructor(public payload: User) { }
}

export class RemoveUserSuccess implements Action {
  readonly type = UsersActionTypes.RemoveUserSuccess;

  constructor(public payload: User) { }
}

export class RemoveUserFail implements Action {
  readonly type = UsersActionTypes.RemoveUserFail;

  constructor(public payload: User) { }
}

/**
 * Load User Actions
 */
export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadUsersSuccess;

  constructor(public payload: User[]) { }
}

export class LoadUsersFail implements Action {
  readonly type = UsersActionTypes.LoadUsersFail;

  constructor(public payload: string) { }
}

/**
 * Search User Actions
 */
export class SearchUser implements Action {
  readonly type = UsersActionTypes.SearchUser;

  constructor(public payload: string) { }
}

export class SearchUserComplete implements Action {
  readonly type = UsersActionTypes.SearchUserComplete;

  constructor(public payload: User[]) { }
}

export type UsersActions
  = SelectUser
  | ClearSelectedUser
  | InitializeUser
  | AddUser
  | AddUserSuccess
  | AddUserFail
  | RemoveUser
  | RemoveUserSuccess
  | RemoveUserFail
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | SearchUser
  | SearchUserComplete;
