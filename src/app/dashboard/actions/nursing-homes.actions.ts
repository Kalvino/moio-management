import { Action } from '@ngrx/store';
import { NursingHome } from '../models/nursing-home.model';
import { Update } from '@ngrx/entity';

export enum NursingHomesActionTypes {
  SelectNursingHome = '[NursingHome] Select Current NursingHome',
  ClearSelectedNursingHome = '[NursingHome] Clear Current NursingHome',
  InitializeNursingHome = '[NursingHome] Initialize Current NursingHome',
  PopUpNursingHomeForm = '[NursingHome] Pop Up NursingHome Form',
  CreateNursingHome = '[NursingHome] Create NursingHome',
  DismissPoppedUpNursingHomeForm = '[NursingHome] Dismiss Create NursingHome',
  LoadNursingHomes = '[NursingHome] Load Nursing Homes',
  SearchNursingHome = '[NursingHome] Search NursingHome',
  SearchNursingHomeComplete = '[NursingHome] Search NursingHome Complete',
  EditNursingHome = '[NursingHome] Edit NursingHome',
  DismissEditNursingHome = '[NursingHome] Dismiss Edit NursingHome',
  DeleteNursingHome = '[NursingHome] Delete NursingHome',
  ResetNursingHomesState = '[NursingHomes] Reset NursingHomes State',
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
export class DismissPoppedUpNursingHomeForm implements Action {
  readonly type = NursingHomesActionTypes.DismissPoppedUpNursingHomeForm;
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
 * Export union of nursingHome Action
 */
export type NursingHomesActionsUnion
  = SelectNursingHome
  | ClearSelectedNursingHome
  | InitializeNursingHome
  | PopUpNursingHomeForm
  | CreateNursingHome
  | DismissPoppedUpNursingHomeForm
  | LoadNursingHomes
  | SearchNursingHome
  | SearchNursingHomeComplete
  | EditNursingHome
  | DismissEditNursingHome
  | ResetNursingHomesState;
