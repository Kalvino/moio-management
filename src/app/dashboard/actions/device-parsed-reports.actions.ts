import { Action } from '@ngrx/store';
export enum ParsedDeviceReportsActionTypes {
  LoadDeviceParsedReports = '[Device] Load Device Parsed Reports'
}

/**
 * Load device raw reports action
 */
export class LoadDeviceParsedReports implements Action {
  readonly type = ParsedDeviceReportsActionTypes.LoadDeviceParsedReports;
  constructor(public payload: number ) { }
}

/**
 * Export union of device Action
 */
export type ParsedDeviceReportsActionsUnion
  = 
  | LoadDeviceParsedReports;
