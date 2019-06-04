import { Action } from '@ngrx/store';
import { IDevice } from '../models/device.model';
import { IDeviceReport } from '../models/device-report.model';

/**
 * definitions for action types
 */
export enum DevicesApiActionTypes {
  CreateDeviceSuccess = '[Device/Api] Create Device Success',
  CreateDeviceFailure = '[Device/Api] Create Device Failure',
  LoadDevicesSuccess = '[Device/Api] Load Devices Success',
  LoadDevicesFailure = '[Device/Api] Load Devices Failure',
  EditDeviceSuccess = '[Device/Api] Edit Device Success',
  EditDeviceFailure = '[Device/Api] Edit Device Failure'
}

/**
 * add device success action
 */
export class CreateDeviceSuccess implements Action {
  public readonly type = DevicesApiActionTypes.CreateDeviceSuccess;

  constructor(public payload: { device: IDevice }) {
  }
}

/**
 * add device failure action
 */
export class CreateDeviceFailure implements Action {
  public readonly type = DevicesApiActionTypes.CreateDeviceFailure;

  constructor(public payload: { messages: string }) {
  }
}

/**
 * load all devices success action
 */
export class LoadDevicesSuccess implements Action {
  public readonly type = DevicesApiActionTypes.LoadDevicesSuccess;

  constructor(public payload: { devices: IDevice[] }) {
  }
}

/**
 * load all devices failure action
 */
export class LoadDevicesFailure implements Action {
  public readonly type = DevicesApiActionTypes.LoadDevicesFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * edit device success action
 */
export class EditDeviceSuccess implements Action {
  public readonly type = DevicesApiActionTypes.EditDeviceSuccess;

  constructor(public payload: { device: IDevice }) {
  }
}

/**
 * edit device failure action
 */
export class EditDeviceFailure implements Action {
  public readonly type = DevicesApiActionTypes.EditDeviceFailure;

  constructor(public payload: { message: string }) {
  }
}

// export types
export type DevicesApiActionsUnion =
  | CreateDeviceSuccess
  | CreateDeviceFailure
  | EditDeviceSuccess
  | EditDeviceFailure
  | LoadDevicesSuccess
  | LoadDevicesFailure;
