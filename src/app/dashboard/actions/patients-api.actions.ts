import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import { IPatient } from '../models/patient.model';

/**
 * definitions for action types
 */
export enum PatientsApiActionTypes {
  CreatePatientSuccess = '[Patient/Api] Create Patient Success',
  CreatePatientFailure = '[Patient/Api] Create Patient Failure',
  LoadPatientsSuccess = '[Patient/Api] Load Patients Success',
  LoadPatientsFailure = '[Patient/Api] Load Patients Failure',
  EditPatientSuccess = '[Patient/Api] Edit Patient Success',
  EditPatientFailure = '[Patient/Api] Edit Patient Failure',
  LoadPatientUsersSuccess = '[User/Api] Load Patient Users Success',
  LoadPatientUsersFailure = '[User/Api] Load Patient Users Failure',
}

/**
 * add patient success action
 */
export class CreatePatientSuccess implements Action {
  public readonly type = PatientsApiActionTypes.CreatePatientSuccess;

  constructor(public payload: { patient: IPatient }) {
  }
}

/**
 * add patient failure action
 */
export class CreatePatientFailure implements Action {
  public readonly type = PatientsApiActionTypes.CreatePatientFailure;

  constructor(public payload: { messages: string }) {
  }
}

/**
 * load all patients success action
 */
export class LoadPatientsSuccess implements Action {
  public readonly type = PatientsApiActionTypes.LoadPatientsSuccess;

  constructor(public payload: { patients: IPatient[] }) {
  }
}

/**
 * load all patients action
 */
export class LoadPatientsFailure implements Action {
  public readonly type = PatientsApiActionTypes.LoadPatientsFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * edit patient success action
 */
export class EditPatientSuccess implements Action {
  public readonly type = PatientsApiActionTypes.EditPatientSuccess;

  constructor(public payload: { patient: IPatient }) {
  }
}

/**
 * edit patient failure action
 */
export class EditPatientFailure implements Action {
  public readonly type = PatientsApiActionTypes.EditPatientFailure;

  constructor(public payload: { message: string }) {
  }
}

/**
 * load all patient users success action
 */
export class LoadPatientUsersSuccess implements Action {
  public readonly type = PatientsApiActionTypes.LoadPatientUsersSuccess;

  constructor(public payload: { users: User[] }) {
  }
}

/**
 * load all patient users failure action
 */
export class LoadPatientUsersFailure implements Action {
  public readonly type = PatientsApiActionTypes.LoadPatientUsersFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type PatientsApiActionsUnion =
  | CreatePatientSuccess
  | CreatePatientFailure
  | EditPatientSuccess
  | EditPatientFailure
  | LoadPatientsSuccess
  | LoadPatientsFailure
  | LoadPatientUsersSuccess
  | LoadPatientUsersFailure;
