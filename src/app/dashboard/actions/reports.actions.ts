import { Action } from '@ngrx/store';
import { Report } from '../models/report.model';
import { Update } from '@ngrx/entity';

export enum ReportsActionTypes {
  SelectReport = '[Report] Select Current Report',
  ClearSelectedReport = '[Report] Clear Current Report',
  InitializeReport = '[Report] Initialize Current Report',
  CreateReportFormDialog = '[Reports] Pop Up Report Form',
  CreateReport = '[Report] Create Report',
  DismissReportFormDialog = '[Report] Dismiss Report Form Dialog',
  LoadReports = '[Report] Load Reports',
  SearchReport = '[Report] Search Report',
  SearchReportComplete = '[Report] Search Report Complete',
  EditReport = '[Report] Edit Report',
  DismissEditReport = '[Report] Dismiss Edit Report',
  ResetReportsState = '[Reports] Reset Reports State',
  DeleteReport = '[Reports] Delete Report',
  LoadReportPatients = '[Report] Load Report Patients'
}


/**
 * Select user Action
 */
export class SelectReport implements Action {
  readonly type = ReportsActionTypes.SelectReport;

  constructor(public payload: Report) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedReport implements Action {
  readonly type = ReportsActionTypes.ClearSelectedReport;
}

/**
 * Initialize user Action
 */
export class InitializeReport implements Action {
  readonly type = ReportsActionTypes.InitializeReport;
}

/**
 * action to pop up user form
 */
export class CreateReportFormDialog implements Action {
  readonly type = ReportsActionTypes.CreateReportFormDialog;
}

/**
 * Create user Action
 */
export class CreateReport implements Action {
  readonly type = ReportsActionTypes.CreateReport;

  constructor(public payload: { user: Report }) { }
}

/**
 * CreateReport Dialog window dismissed
 */
export class DismissReportFormDialog implements Action {
  readonly type = ReportsActionTypes.DismissReportFormDialog;
}

/**
 * Load users Action
 */
export class LoadReports implements Action {
  readonly type = ReportsActionTypes.LoadReports;
}

/**
 * Search user action
 */
export class SearchReport implements Action {
  readonly type = ReportsActionTypes.SearchReport;

  constructor(public payload: string) { }
}

/**
 * Search user complete action
 */
export class SearchReportComplete implements Action {
  readonly type = ReportsActionTypes.SearchReportComplete;

  constructor(public payload: Report[]) { }
}

/**
 * action to submit and edit user
 */
export class EditReport implements Action {
  readonly type = ReportsActionTypes.EditReport;

  constructor(public payload: Report) {
  }
}

/**
 * Report Edit dismissed action
 */
export class DismissEditReport implements Action {
  readonly type = ReportsActionTypes.DismissEditReport;
}

/**
 * reset the user state
 */
export class ResetReportsState implements Action {
  readonly type = ReportsActionTypes.ResetReportsState;
}

/**
 * action to delete a user
 */
export class DeleteReport implements Action {
  readonly type = ReportsActionTypes.DeleteReport;

  constructor(public payload: number) {
  }
}

/**
 * Load user patients action
 */
export class LoadReportPatients implements Action {
  readonly type = ReportsActionTypes.LoadReportPatients;
  constructor(public payload: number ) { }
}

/**
 * Export union of user Action
 */
export type ReportsActionsUnion
  = SelectReport
  | ClearSelectedReport
  | InitializeReport
  | CreateReportFormDialog
  | CreateReport
  | DismissReportFormDialog
  | LoadReports
  | SearchReport
  | SearchReportComplete
  | EditReport
  | DismissEditReport
  | ResetReportsState
  | LoadReportPatients;
