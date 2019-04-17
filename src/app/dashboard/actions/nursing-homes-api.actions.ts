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
  LoadNursingHomeGeofencingSuccess = '[NursingHome/Api] Load NursingHome Geofencing Success',
  LoadNursingHomeGeofencingFailure = '[NursingHome/Api] Load NursingHome Geofencing Failure',
  CreateNursingHomeGeofencingSuccess = '[NursingHome/Api] Create NursingHome Geofencing Success',
  CreateNursingHomeGeofencingFailure = '[NursingHome/Api] Create NursingHome Geofencing Failure',
  EditNursingHomeGeofencingSuccess = '[NursingHome/Api] Edit NursingHome Geofencing Success',
  EditNursingHomeGeofencingFailure = '[NursingHome/Api] Edit NursingHome Geofencing Failure',
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
export class LoadNursingHomeGeofencingSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomeGeofencingSuccess;

  constructor(public payload: { geofencing: Geofencing[] }) {
  }
}

/**
 * load all nursinghome geofencing failure action
 */
export class LoadNursingHomeGeofencingFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.LoadNursingHomeGeofencingFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * add nursingHome geofencing success action
 */
export class CreateNursingHomeGeofencingSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.CreateNursingHomeGeofencingSuccess;

  constructor(public payload: { geofencing: Geofencing }) {
  }
}

/**
 * add nursingHome geofencing failure action
 */
export class CreateNursingHomeGeofencingFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.CreateNursingHomeGeofencingFailure;

  constructor(public payload: { message: string }) {
  }
}

/**
 * edit nursingHome geofencing success action
 */
export class EditNursingHomeGeofencingSuccess implements Action {
  public readonly type = NursingHomesApiActionTypes.EditNursingHomeGeofencingSuccess;

  constructor(public payload: { geofencing: Geofencing }) {
  }
}

/**
 * edit nursingHome geofencing failure action
 */
export class EditNursingHomeGeofencingFailure implements Action {
  public readonly type = NursingHomesApiActionTypes.EditNursingHomeGeofencingFailure;

  constructor(public payload: { message: string }) {
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
  | LoadNursingHomeGeofencingSuccess
  | LoadNursingHomeGeofencingFailure
  | CreateNursingHomeGeofencingSuccess
  | CreateNursingHomeGeofencingFailure
  | EditNursingHomeGeofencingSuccess
  | EditNursingHomeGeofencingFailure
