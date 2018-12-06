import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { Update } from '@ngrx/entity';

export enum UsersActionTypes {
  SelectUser = '[User] Select Current User',
  ClearSelectedUser = '[User] Clear Current User',
  InitializeUser = '[User] Initialize Current User',
  PopUpUserForm = '[Users] Pop Up User Form',
  CreateUser = '[User] Create User',
  DismissPoppedUpUserForm = '[User] Dismiss Create user',
  LoadUsers = '[User] Load Users',
  SearchUser = '[User] Search User',
  SearchUserComplete = '[User] Search User Complete',
  EditUser = '[User] Edit User',
  DismissEditUser = '[User] Dismiss Edit User',
  ResetUsersState = '[Users] Reset Users State'
}


/**
 * Select user Action
 */
export class SelectUser implements Action {
  readonly type = UsersActionTypes.SelectUser;

  constructor(public payload: User) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedUser implements Action {
  readonly type = UsersActionTypes.ClearSelectedUser;
}

/**
 * Initialize user Action
 */
export class InitializeUser implements Action {
  readonly type = UsersActionTypes.InitializeUser;
}

/**
 * action to pop up user form
 */
export class PopUpUserForm implements Action {
  readonly type = UsersActionTypes.PopUpUserForm;
}

/**
 * Create user Action
 */
export class CreateUser implements Action {
  readonly type = UsersActionTypes.CreateUser;

  constructor(public payload: { user: User }) { }
}

/**
 * CreateUser Dialog window dismissed
 */
export class DismissPoppedUpUserForm implements Action {
  readonly type = UsersActionTypes.DismissPoppedUpUserForm;
}

/**
 * Load users Action
 */
export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

/**
 * Search user Action
 */
export class SearchUser implements Action {
  readonly type = UsersActionTypes.SearchUser;

  constructor(public payload: string) { }
}

/**
 * Search user complete Action
 */
export class SearchUserComplete implements Action {
  readonly type = UsersActionTypes.SearchUserComplete;

  constructor(public payload: User[]) { }
}

/**
 * action to submit and edit user
 */
export class EditUser implements Action {
  readonly type = UsersActionTypes.EditUser;

  constructor(public payload: Update<User>) {
  }
}

/**
 * User Edit dismissed action
 */
export class DismissEditUser implements Action {
  readonly type = UsersActionTypes.DismissEditUser;
}

/**
 * reset the user state
 */
export class ResetUsersState implements Action {
  readonly type = UsersActionTypes.ResetUsersState;
}

/**
 * Export union of user Action
 */
export type UsersActionsUnion
  = SelectUser
  | ClearSelectedUser
  | InitializeUser
  | PopUpUserForm
  | CreateUser
  | DismissPoppedUpUserForm
  | LoadUsers
  | SearchUser
  | SearchUserComplete
  | EditUser
  | DismissEditUser
  | ResetUsersState;
