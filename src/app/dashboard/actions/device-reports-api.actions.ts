import { Action } from '@ngrx/store';
import { IDeviceReport } from '../models/device-report.model';

/**
 * definitions for action types
 */
export enum DeviceReportsApiActionTypes {
  LoadDeviceReportsSuccess = '[DeviceReports/Api] Load Device Reports Success',
  LoadDeviceReportsFailure = '[DeviceReports/Api] Load Device Reports Failure',
}

/**
 * load all device reports success action
 */
export class LoadDeviceReportsSuccess implements Action {
  public readonly type = DeviceReportsApiActionTypes.LoadDeviceReportsSuccess;

  constructor(public payload: { reports: IDeviceReport[] }) {
  }
}

/**
 * load all device reports failure action
 */
export class LoadDeviceReportsFailure implements Action {
  public readonly type = DeviceReportsApiActionTypes.LoadDeviceReportsFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type DeviceReportsApiActionsUnion =
  | LoadDeviceReportsSuccess
  | LoadDeviceReportsFailure;
