import { Action } from '@ngrx/store';
import { IParsedDeviceReport } from '../models/parsed-device-report.model';

/**
 * definitions for device parsed reports action types
 */
export enum ParsedDeviceReportsApiActionTypes {
  LoadParsedDeviceReportsSuccess = '[DeviceReports/Api] Load Parsed Device Reports Success',
  LoadParsedDeviceReportsFailure = '[DeviceReports/Api] Load Parsed Device Reports Failure',
}

/**
 * load all device parsed reports success action
 */
export class LoadParsedDeviceReportsSuccess implements Action {
  public readonly type = ParsedDeviceReportsApiActionTypes.LoadParsedDeviceReportsSuccess;

  constructor(public payload: { parsedDeviceReports: IParsedDeviceReport[] }) {
  }
}

/**
 * load all device parsed reports failure action
 */
export class LoadParsedDeviceReportsFailure implements Action {
  public readonly type = ParsedDeviceReportsApiActionTypes.LoadParsedDeviceReportsFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type ParsedDeviceReportsApiActionsUnion =
  | LoadParsedDeviceReportsSuccess
  | LoadParsedDeviceReportsFailure;
