import { Action } from '@ngrx/store';
export enum RawDeviceReportsActionTypes {
  LoadDeviceRawReports = '[Device] Load Device Raw Reports'
}

/**
 * Load device raw action
 */
export class LoadDeviceRawReports implements Action {
  readonly type = RawDeviceReportsActionTypes.LoadDeviceRawReports;
  constructor(public payload: number ) { }
}

/**
 * Export union of device Action
 */
export type RawDeviceReportsActionsUnion
  = 
  | LoadDeviceRawReports;
