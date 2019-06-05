import { Action } from '@ngrx/store';
import { IDeviceCommand } from '../models/device-command.model';

/**
 * definitions for action types
 */
export enum DeviceCommandsApiActionTypes {
  LoadDeviceCommandsSuccess = '[DeviceCommands/Api] Load Device Commands Success',
  LoadDeviceCommandsFailure = '[DeviceCommands/Api] Load Device Commands Failure',
  SendDatalessCommandSuccess = '[Device Commands/Api] Send Dataless Command Success',
  SendDatalessCommandFailure = '[Device Commands/Api] Send Dataless Command Failure'
}

/**
 * load all device commands success action
 */
export class LoadDeviceCommandsSuccess implements Action {
  public readonly type = DeviceCommandsApiActionTypes.LoadDeviceCommandsSuccess;

  constructor(public payload: { deviceCommands: IDeviceCommand[] }) {
  }
}

/**
 * load all device commands failure action
 */
export class LoadDeviceCommandsFailure implements Action {
  public readonly type = DeviceCommandsApiActionTypes.LoadDeviceCommandsFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * Send Dataless commands success action
 */
export class SendDatalessCommandSuccess implements Action {
  public readonly type = DeviceCommandsApiActionTypes.SendDatalessCommandSuccess;

  constructor(public payload: { deviceCommand: IDeviceCommand }) {
  }
}

/**
 * Send Dataless commands failure action
 */
export class SendDatalessCommandFailure implements Action {
  public readonly type = DeviceCommandsApiActionTypes.SendDatalessCommandFailure;

  constructor(public payload: { message: any }) {
  }
}

// export types
export type DeviceCommandsApiActionsUnion =
  | LoadDeviceCommandsSuccess
  | LoadDeviceCommandsFailure
  | SendDatalessCommandSuccess
  | SendDatalessCommandFailure;
