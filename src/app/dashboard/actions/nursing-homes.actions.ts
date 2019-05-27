import { Action } from '@ngrx/store';
import { NursingHome } from '../models/nursing-home.model';
import { Geofencing } from '../models/nursing-home-geofencing.model';

export enum NursingHomesActionTypes {
  SelectNursingHome = '[NursingHome] Select Current NursingHome',
  ClearSelectedNursingHome = '[NursingHome] Clear Current NursingHome',
  InitializeNursingHome = '[NursingHome] Initialize Current NursingHome',
  PopUpNursingHomeForm = '[NursingHome] Pop Up NursingHome Form',
  CreateNursingHome = '[NursingHome] Create NursingHome',
  DismissNewNursingHome = '[NursingHome] Dismiss Create NursingHome',
  LoadNursingHomes = '[NursingHome] Load Nursing Homes',
  SearchNursingHome = '[NursingHome] Search NursingHome',
  SearchNursingHomeComplete = '[NursingHome] Search NursingHome Complete',
  EditNursingHome = '[NursingHome] Edit NursingHome',
  DismissEditNursingHome = '[NursingHome] Dismiss Edit NursingHome',
  DeleteNursingHome = '[NursingHome] Delete NursingHome',
  ResetNursingHomesState = '[NursingHomes] Reset NursingHomes State',
  LoadNursingHomeGeofencing = '[NursingHome] Load NursingHome Geofencing',
  CreateNursingHomeGeofencing = '[NursingHome] Create NursingHome Geofencing',
  EditNursingHomeGeofencing = '[NursingHome] Edit NursingHome Geofencing',
  DismissNewNursingHomeGeofencing = '[NursingHome] Dismiss Create NursingHome Geofencing',
  DismissEditNursingHomeGeofencing = '[NursingHome] Dismiss Edit NursingHome Geofencing',
  SelectNursingHomeGeofencing = '[NursingHome] Select NursingHome Geofencing',
  ResetNursingHomeGeofencingState = '[NursingHomes] Reset NursingHome Geofencing State',
  DeleteNursingHomeGeofencing = '[NursingHome] Delete NursingHome Geofencing',
}


/**
 * Select nursingHome Action
 */
export class SelectNursingHome implements Action {
  readonly type = NursingHomesActionTypes.SelectNursingHome;

  constructor(public payload: NursingHome) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedNursingHome implements Action {
  readonly type = NursingHomesActionTypes.ClearSelectedNursingHome;
}

/**
 * Initialize nursingHome Action
 */
export class InitializeNursingHome implements Action {
  readonly type = NursingHomesActionTypes.InitializeNursingHome;
}

/**
 * action to pop up nursingHome form
 */
export class PopUpNursingHomeForm implements Action {
  readonly type = NursingHomesActionTypes.PopUpNursingHomeForm;
}

/**
 * Create nursingHome Action
 */
export class CreateNursingHome implements Action {
  readonly type = NursingHomesActionTypes.CreateNursingHome;

  constructor(public payload: { nursingHome: NursingHome }) { }
}

/**
 * CreateNursingHome Dialog window dismissed
 */
export class DismissNewNursingHome implements Action {
  readonly type = NursingHomesActionTypes.DismissNewNursingHome;
}

/**
 * Load nursingHomes Action
 */
export class LoadNursingHomes implements Action {
  readonly type = NursingHomesActionTypes.LoadNursingHomes;
}

/**
 * Search nursingHome Action
 */
export class SearchNursingHome implements Action {
  readonly type = NursingHomesActionTypes.SearchNursingHome;

  constructor(public payload: string) { }
}

/**
 * Search nursingHome complete Action
 */
export class SearchNursingHomeComplete implements Action {
  readonly type = NursingHomesActionTypes.SearchNursingHomeComplete;

  constructor(public payload: NursingHome[]) { }
}

/**
 * action to submit and edit nursingHome
 */
export class EditNursingHome implements Action {
  readonly type = NursingHomesActionTypes.EditNursingHome;

  constructor(public payload: NursingHome) {
  }
}

/**
 * NursingHome Edit dismissed action
 */
export class DismissEditNursingHome implements Action {
  readonly type = NursingHomesActionTypes.DismissEditNursingHome;
}

/**
 * action to delete a patient
 */
export class DeleteNursingHome implements Action {
  readonly type = NursingHomesActionTypes.DeleteNursingHome;

  constructor(public payload: number) {
  }
}


/**
 * reset the nursingHome state
 */
export class ResetNursingHomesState implements Action {
  readonly type = NursingHomesActionTypes.ResetNursingHomesState;
}

/**
 * Load nursinghome geogencing action
 */
export class LoadNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.LoadNursingHomeGeofencing;
  constructor(public payload: number) { }
}

/**
 * action to submit and edit nursingHome
 */
export class EditNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.EditNursingHomeGeofencing;

  constructor(public payload: Geofencing) {
  }
}

/**
 * Create nursingHome Action
 */
export class CreateNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.CreateNursingHomeGeofencing;

  constructor(public payload: { geofencing: Geofencing }) { }
}

/**
 * NursingHome Geofencing Edit dismissed action
 */
export class DismissEditNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.DismissEditNursingHomeGeofencing;
}

/**
 * CreateNursingHome Geofencing Dialog window dismissed
 */
export class DismissNewNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.DismissNewNursingHomeGeofencing;
}

/**
 * Select nursingHome Geofencing Action
 */
export class SelectNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.SelectNursingHomeGeofencing;

  constructor(public payload: Geofencing) { }
}


/**
 * reset the nursingHome geofencing state
 */
export class ResetNursingHomeGeofencingState implements Action {
  readonly type = NursingHomesActionTypes.ResetNursingHomeGeofencingState;
}

/**
 * Delete nursingHome Action
 */
export class DeleteNursingHomeGeofencing implements Action {
  readonly type = NursingHomesActionTypes.DeleteNursingHomeGeofencing;

  constructor(public payload: Geofencing) { }

}


/**
 * Export union of nursingHome Action
 */
export type NursingHomesActionsUnion
  = SelectNursingHome
  | ClearSelectedNursingHome
  | InitializeNursingHome
  | PopUpNursingHomeForm
  | CreateNursingHome
  | DismissNewNursingHome
  | LoadNursingHomes
  | SearchNursingHome
  | SearchNursingHomeComplete
  | EditNursingHome
  | DismissEditNursingHome
  | ResetNursingHomesState
  | LoadNursingHomeGeofencing
  | CreateNursingHomeGeofencing
  | EditNursingHomeGeofencing
  | DismissNewNursingHomeGeofencing
  | DismissEditNursingHomeGeofencing
  | SelectNursingHomeGeofencing
  | ResetNursingHomeGeofencingState
  | DeleteNursingHomeGeofencing
