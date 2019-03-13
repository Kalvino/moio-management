import {Action} from '@ngrx/store';
import {IDevice} from '../../model/device.model';
import {IDeviceSetting} from '../../model/device-settings.model';

export enum DeviceSettingsActionTypes {
    LoadAllDeviceSettingsRequest = '[Devices] Load All Devices Settings Request',
    LoadAllDeviceSettingsSuccess = '[Devices] Load All Devices Settings Success',
    LoadAllDeviceSettingsFailure = '[Devices] Load All Devices Settings Failure',
}

/**
 * Load all devices
 */
export class LoadAllDeviceSettingsRequest implements Action {
    readonly type = DeviceSettingsActionTypes.LoadAllDeviceSettingsRequest;

    constructor() {
    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceSettingsSuccess implements Action {
    readonly type = DeviceSettingsActionTypes.LoadAllDeviceSettingsSuccess;

    constructor(public payload: { deviceSettings: IDeviceSetting[] }) {

    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceSettingsFailure implements Action {
    readonly type = DeviceSettingsActionTypes.LoadAllDeviceSettingsFailure;
}

/**
 * Export union of devices Action
 */
export type DeviceSettingsActionsUnion =
    | LoadAllDeviceSettingsRequest
    | LoadAllDeviceSettingsSuccess
    | LoadAllDeviceSettingsFailure;

