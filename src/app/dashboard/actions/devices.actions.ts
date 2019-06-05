import { Action } from '@ngrx/store';
import { IDevice } from '../models/device.model';
import { Update } from '@ngrx/entity';

export enum DevicesActionTypes {
  SelectDevice = '[Device] Select Current Device',
  ClearSelectedDevice = '[Device] Clear Current Device',
  InitializeDevice = '[Device] Initialize Current Device',
  CreateDeviceFormDialog = '[Devices] Pop Up Device Form',
  CreateDevice = '[Device] Create Device',
  DismissDeviceFormDialog = '[Device] Dismiss Device Form Dialog',
  LoadDevices = '[Device] Load Devices',
  SearchDevice = '[Device] Search Device',
  SearchDeviceComplete = '[Device] Search Device Complete',
  EditDevice = '[Device] Edit Device',
  DismissEditDevice = '[Device] Dismiss Edit Device',
  ResetDevicesState = '[Devices] Reset Devices State',
  DeleteDevice = '[Devices] Delete Device',
  TriggerDatalessCommand = '[Device Dataless Command] Trigger Dataless Command'
}


/**
 * Select device Action
 */
export class SelectDevice implements Action {
  readonly type = DevicesActionTypes.SelectDevice;

  constructor(public payload: IDevice) { }
}

/**
 * Clear selected ser Action
 */
export class ClearSelectedDevice implements Action {
  readonly type = DevicesActionTypes.ClearSelectedDevice;
}

/**
 * Initialize device Action
 */
export class InitializeDevice implements Action {
  readonly type = DevicesActionTypes.InitializeDevice;
}

/**
 * action to pop up device form
 */
export class CreateDeviceFormDialog implements Action {
  readonly type = DevicesActionTypes.CreateDeviceFormDialog;
}

/**
 * Create device Action
 */
export class CreateDevice implements Action {
  readonly type = DevicesActionTypes.CreateDevice;

  constructor(public payload: { device: IDevice }) { }
}

/**
 * CreateDevice Dialog window dismissed
 */
export class DismissDeviceFormDialog implements Action {
  readonly type = DevicesActionTypes.DismissDeviceFormDialog;
}

/**
 * Load devices Action
 */
export class LoadDevices implements Action {
  readonly type = DevicesActionTypes.LoadDevices;
}

/**
 * Search device action
 */
export class SearchDevice implements Action {
  readonly type = DevicesActionTypes.SearchDevice;

  constructor(public payload: string) { }
}

/**
 * Search device complete action
 */
export class SearchDeviceComplete implements Action {
  readonly type = DevicesActionTypes.SearchDeviceComplete;

  constructor(public payload: IDevice[]) { }
}

/**
 * action to submit and edit device
 */
export class EditDevice implements Action {
  readonly type = DevicesActionTypes.EditDevice;

  constructor(public payload: IDevice) {
  }
}

/**
 * Device Edit dismissed action
 */
export class DismissEditDevice implements Action {
  readonly type = DevicesActionTypes.DismissEditDevice;
}

/**
 * reset the device state
 */
export class ResetDevicesState implements Action {
  readonly type = DevicesActionTypes.ResetDevicesState;
}

/**
 * action to delete a device
 */
export class DeleteDevice implements Action {
  readonly type = DevicesActionTypes.DeleteDevice;

  constructor(public payload: number) {
  }
}

/**
 * Send dataless commands to device action
 */
export class TriggerDatalessCommand implements Action {
  readonly type = DevicesActionTypes.TriggerDatalessCommand;
  constructor(public payload: {device_id: number, short_name: string} ) { }
}

/**
 * Export union of device Action
 */
export type DevicesActionsUnion
  = SelectDevice
  | ClearSelectedDevice
  | InitializeDevice
  | CreateDeviceFormDialog
  | CreateDevice
  | DismissDeviceFormDialog
  | LoadDevices
  | SearchDevice
  | SearchDeviceComplete
  | EditDevice
  | DismissEditDevice
  | ResetDevicesState
  | TriggerDatalessCommand;
