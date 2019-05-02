import {Action} from '@ngrx/store';
import {IDeviceCommand} from '../../model/device-command.model';

export enum DeviceCommandsActionTypes {
    LoadAllDeviceCommandsRequest = '[Device/Command] Load All Devices Commands Request',
    LoadAllDeviceCommandsSuccess = '[Device/Command] Load All Devices Commands Success',
    LoadAllDeviceCommandsFailure = '[Device/Command] Load All Devices Commands Failure',
}

export class LoadAllDeviceCommandsRequest implements Action {
    readonly type = DeviceCommandsActionTypes.LoadAllDeviceCommandsRequest;

    constructor() {
    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceCommandsSuccess implements Action {
    readonly type = DeviceCommandsActionTypes.LoadAllDeviceCommandsSuccess;

    constructor(public payload: { deviceCommands: IDeviceCommand[] }) {

    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceCommandsFailure implements Action {
    readonly type = DeviceCommandsActionTypes.LoadAllDeviceCommandsFailure;
}

/**
 * Export union of devices Action
 */
export type DeviceCommandsActionsUnion =
    | LoadAllDeviceCommandsRequest
    | LoadAllDeviceCommandsSuccess
    | LoadAllDeviceCommandsFailure;

