import { Action } from '@ngrx/store';
import { IRawDeviceReport } from '../models/raw-device-report.model';

/**
 * definitions for action types
 */
export enum RawDeviceReportsApiActionTypes {
  LoadRawDeviceReportsSuccess = '[DeviceReports/Api] Load Raw Device Reports Success',
  LoadRawDeviceReportsFailure = '[DeviceReports/Api] Load Raw Device Reports Failure',
}

/**
 * load all device raw reports success action
 */
export class LoadRawDeviceReportsSuccess implements Action {
  public readonly type = RawDeviceReportsApiActionTypes.LoadRawDeviceReportsSuccess;

  constructor(public payload: { rawDeviceReports: IRawDeviceReport[] }) {
  }
}

/**
 * load all device raw reports failure action
 */
export class LoadRawDeviceReportsFailure implements Action {
  public readonly type = RawDeviceReportsApiActionTypes.LoadRawDeviceReportsFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type RawDeviceReportsApiActionsUnion =
  | LoadRawDeviceReportsSuccess
  | LoadRawDeviceReportsFailure;
