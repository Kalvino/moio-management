import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { IPatient } from '../models/patient.model';

/**
 * definitions for action types
 */
export enum UsersApiActionTypes {
  CreateUserSuccess = '[User/Api] Create User Success',
  CreateUserFailure = '[User/Api] Create User Failure',
  LoadUsersSuccess = '[User/Api] Load Users Success',
  LoadUsersFailure = '[User/Api] Load Users Failure',
  EditUserSuccess = '[User/Api] Edit User Success',
  EditUserFailure = '[User/Api] Edit User Failure',
  LoadUserPatientsSuccess = '[User/Api] Load User Patients Success',
  LoadUserPatientsFailure = '[User/Api] Load User Patients Failure',
}

/**
 * add user success action
 */
export class CreateUserSuccess implements Action {
  public readonly type = UsersApiActionTypes.CreateUserSuccess;

  constructor(public payload: { user: User }) {
  }
}

/**
 * add user failure action
 */
export class CreateUserFailure implements Action {
  public readonly type = UsersApiActionTypes.CreateUserFailure;

  constructor(public payload: { messages: string }) {
  }
}

/**
 * load all users success action
 */
export class LoadUsersSuccess implements Action {
  public readonly type = UsersApiActionTypes.LoadUsersSuccess;

  constructor(public payload: { users: User[] }) {
  }
}

/**
 * load all users failure action
 */
export class LoadUsersFailure implements Action {
  public readonly type = UsersApiActionTypes.LoadUsersFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * edit user success action
 */
export class EditUserSuccess implements Action {
  public readonly type = UsersApiActionTypes.EditUserSuccess;

  constructor(public payload: { user: User }) {
  }
}

/**
 * edit user failure action
 */
export class EditUserFailure implements Action {
  public readonly type = UsersApiActionTypes.EditUserFailure;

  constructor(public payload: { message: string }) {
  }
}

/**
 * load all user patients success action
 */
export class LoadUserPatientsSuccess implements Action {
  public readonly type = UsersApiActionTypes.LoadUserPatientsSuccess;

  constructor(public payload: { patients: IPatient[] }) {
  }
}

/**
 * load all user patients failure action
 */
export class LoadUserPatientsFailure implements Action {
  public readonly type = UsersApiActionTypes.LoadUserPatientsFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type UsersApiActionsUnion =
  | CreateUserSuccess
  | CreateUserFailure
  | EditUserSuccess
  | EditUserFailure
  | LoadUsersSuccess
  | LoadUsersFailure
  | LoadUserPatientsSuccess
  | LoadUserPatientsFailure
