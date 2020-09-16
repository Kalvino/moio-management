import { Action } from '@ngrx/store';
import { IPatient } from '../models/patient.model';
import { Update } from '@ngrx/entity';

export enum PatientsActionTypes {
  SelectPatient = '[Patient] Select Current Patient',
  ClearSelectedPatient = '[Patient] Clear Current Patient',
  InitializePatient = '[Patient] Initialize Current Patient',
  CreatePatientFormDialog = '[Patients] Pop Up Patient Form',
  CreatePatient = '[Patient] Create Patient',
  DismissPatientFormDialog = '[Patient] Dismiss Patient Form Dialog',
  LoadPatients = '[Patient] Load Patients',
  SearchPatient = '[Patient] Search Patient',
  SearchPatientComplete = '[Patient] Search Patient Complete',
  EditPatient = '[Patient] Edit Patient',
  DismissEditPatient = '[Patient] Dismiss Edit Patient',
  ResetPatientsState = '[Patients] Reset Patients State',
  DeletePatient ='[Patients] Delete Patient',
  LoadPatientUsers = '[User] Load User Patients'
}


/**
 * Select patient Action
 */
export class SelectPatient implements Action {
  readonly type = PatientsActionTypes.SelectPatient;

  constructor(public payload: IPatient) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedPatient implements Action {
  readonly type = PatientsActionTypes.ClearSelectedPatient;
}

/**
 * Initialize patient Action
 */
export class InitializePatient implements Action {
  readonly type = PatientsActionTypes.InitializePatient;
}

/**
 * action to pop up patient form
 */
export class CreatePatientFormDialog implements Action {
  readonly type = PatientsActionTypes.CreatePatientFormDialog;
}

/**
 * Create patient Action
 */
export class CreatePatient implements Action {
  readonly type = PatientsActionTypes.CreatePatient;

  constructor(public payload: { patient: IPatient }) { }
}

/**
 * CreatePatient Dialog window dismissed
 */
export class DismissPatientFormDialog implements Action {
  readonly type = PatientsActionTypes.DismissPatientFormDialog;
}

/**
 * Load patients Action
 */
export class LoadPatients implements Action {
  readonly type = PatientsActionTypes.LoadPatients;
}

/**
 * Search patient Action
 */
export class SearchPatient implements Action {
  readonly type = PatientsActionTypes.SearchPatient;

  constructor(public payload: string) { }
}

/**
 * Search patient complete Action
 */
export class SearchPatientComplete implements Action {
  readonly type = PatientsActionTypes.SearchPatientComplete;

  constructor(public payload: IPatient[]) { }
}

/**
 * action to submit and edit patient
 */
export class EditPatient implements Action {
  readonly type = PatientsActionTypes.EditPatient;

  constructor(public payload: IPatient) {
  }
}

/**
 * Patient Edit dismissed action
 */
export class DismissEditPatient implements Action {
  readonly type = PatientsActionTypes.DismissEditPatient;
}

/**
 * reset the patient state
 */
export class ResetPatientsState implements Action {
  readonly type = PatientsActionTypes.ResetPatientsState;
}

/**
 * action to delete a patient
 */
export class DeletePatient implements Action {
  readonly type = PatientsActionTypes.DeletePatient;

  constructor(public payload: number) {
  }
}

/**
 * Load patient users action
 */
export class LoadPatientUsers implements Action {
  readonly type = PatientsActionTypes.LoadPatientUsers;
  constructor(public payload: number ) { }
}


/**
 * Export union of patient Action
 */
export type PatientsActionsUnion
  = SelectPatient
  | ClearSelectedPatient
  | InitializePatient
  | CreatePatientFormDialog
  | CreatePatient
  | DismissPatientFormDialog
  | LoadPatients
  | SearchPatient
  | SearchPatientComplete
  | EditPatient
  | DismissEditPatient
  | ResetPatientsState
  | LoadPatientUsers;
