import { Action } from '@ngrx/store';
import { NursingHome } from '../models/nursing-home.model';
import { Geofencing } from '../models/nursing-home-geofencing.model';

/**
 * definitions for action types
 */
export enum NursingHomesApiActionTypes {
  CreateNursingHomeSuccess = '[NursingHome/Api] Create NursingHome Success',
  CreateNursingHomeFailure = '[NursingHome/Api] Create NursingHome Failure',
  LoadNursingHomesSuccess = '[NursingHome/Api] Load NursingHomes Success',
  LoadNursingHomesFailure = '[NursingHome/Api] Load NursingHomes Failure',
  EditNursingHomeSuccess = '[NursingHome/Api] Edit NursingHome Success',
  EditNursingHomeFailure = '[NursingHome/Api] Edit NursingHome Failure',
  LoadNursingHomesGeofencingSuccess = '[NursingHome/Api] Load NursingHome Geofencing Success',
  LoadNursingHomesGeofencingFailure = '[NursingHome/Api] Load NursingHome Geofencing Failure',
}

/**
 * add nursingHome success action
 */
export class CreateNursingHomeSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.CreateNursingHomeSuccess;

  constructor(public payload: { nursingHome: NursingHome }) {
  }
}

/**
 * add nursingHome failure action
 */
export class CreateNursingHomeFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.CreateNursingHomeFailure;

  constructor(public payload: { message: string }) {
  }
}

/**
 * load all nursingHomes success action
 */
export class LoadNursingHomesSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomesSuccess;

  constructor(public payload: { nursingHomes: NursingHome[] }) {
  }
}

/**
 * load all nursingHomes action
 */
export class LoadNursingHomesFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomesFailure;

  constructor(public payload: { message: string }) {
  }
}

/**
 * edit nursingHome success action
 */
export class EditNursingHomeSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.EditNursingHomeSuccess;

  constructor(public payload: { nursingHome: NursingHome }) {
  }
}

/**
 * edit nursingHome failure action
 */
export class EditNursingHomeFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.EditNursingHomeFailure;

  constructor(public payload: { message: string }) {
  }
}


/**
 * load all nursinghome geofencing success action
 */
export class LoadNursingHomesGeofencingSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomesGeofencingSuccess;

  constructor(public payload: { geofencing: Geofencing[] }) {
  }
}

/**
 * load all nursinghome geofencing failure action
 */
export class LoadNursingHomesGeofencingFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomesGeofencingFailure;

  constructor(public payload: { message: any }) {
  }
}


// export types
export type NursingHomesApiActionsUnion =
  | CreateNursingHomeSuccess
  | CreateNursingHomeFailure
  | EditNursingHomeSuccess
  | EditNursingHomeFailure
  | LoadNursingHomesSuccess
  | LoadNursingHomesFailure
  | LoadNursingHomesGeofencingSuccess
  | LoadNursingHomesGeofencingFailure
