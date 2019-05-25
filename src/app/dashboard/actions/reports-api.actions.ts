import { Action } from '@ngrx/store';
import { Report } from '../models/report.model';

/**
 * definitions for action types
 */
export enum ReportsApiActionTypes {
  CreateReportSuccess = '[Report/Api] Create Report Success',
  CreateReportFailure = '[Report/Api] Create Report Failure',
  LoadReportsSuccess = '[Report/Api] Load Reports Success',
  LoadReportsFailure = '[Report/Api] Load Reports Failure',
  EditReportSuccess = '[Report/Api] Edit Report Success',
  EditReportFailure = '[Report/Api] Edit Report Failure',
  LoadReportPatientsSuccess = '[Report/Api] Load Report Patients Success',
  LoadReportPatientsFailure = '[Report/Api] Load Report Patients Failure',
}

/**
 * add report success action
 */
export class CreateReportSuccess implements Action {
  public readonly type = ReportsApiActionTypes.CreateReportSuccess;

  constructor(public payload: { report: Report }) {
  }
}

/**
 * add report failure action
 */
export class CreateReportFailure implements Action {
  public readonly type = ReportsApiActionTypes.CreateReportFailure;

  constructor(public payload: { messages: string }) {
  }
}

/**
 * load all reports success action
 */
export class LoadReportsSuccess implements Action {
  public readonly type = ReportsApiActionTypes.LoadReportsSuccess;

  constructor(public payload: { reports: Report[] }) {
  }
}

/**
 * load all reports failure action
 */
export class LoadReportsFailure implements Action {
  public readonly type = ReportsApiActionTypes.LoadReportsFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * edit report success action
 */
export class EditReportSuccess implements Action {
  public readonly type = ReportsApiActionTypes.EditReportSuccess;

  constructor(public payload: { report: Report }) {
  }
}

/**
 * edit report failure action
 */
export class EditReportFailure implements Action {
  public readonly type = ReportsApiActionTypes.EditReportFailure;

  constructor(public payload: { message: string }) {
  }
}

// export types
export type ReportsApiActionsUnion =
  | CreateReportSuccess
  | CreateReportFailure
  | EditReportSuccess
  | EditReportFailure
  | LoadReportsSuccess
  | LoadReportsFailure
