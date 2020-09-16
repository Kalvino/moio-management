import { Action } from '@ngrx/store';
export enum DeviceCommandsActionTypes {
  LoadDeviceCommands = '[Device] Load Device Commands',
  SendDatalessCommand = '[Device/commands] Send Device Command'
}

/**
 * Load device patients action
 */
export class LoadDeviceCommands implements Action {
    readonly type = DeviceCommandsActionTypes.LoadDeviceCommands;
  }

/**
 * Send dataless commands to device action
 */
export class SendDatalessCommand implements Action {
    readonly type = DeviceCommandsActionTypes.SendDatalessCommand;
    constructor(public payload: string ) { }
  }

/**
 * Export union of device commands Actions
 */
export type DeviceCommandsActionsUnion
  = 
  | LoadDeviceCommands
  | SendDatalessCommand;
