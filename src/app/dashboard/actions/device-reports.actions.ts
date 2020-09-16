import { Action } from '@ngrx/store';
export enum DeviceReportsActionTypes {
  LoadDeviceReports = '[Device] Load Device Reports'
}

/**
 * Load device patients action
 */
export class LoadDeviceReports implements Action {
  readonly type = DeviceReportsActionTypes.LoadDeviceReports;
  constructor(public payload: number ) { }
}

/**
 * Export union of device Action
 */
export type DeviceReportsActionsUnion
  = 
  | LoadDeviceReports;
