import {Action} from '@ngrx/store';
import {IDevice} from '../../model/device.model';

export enum DevicesActionTypes {
    LoadAllDevicesRequest = '[Devices] Load All Devices Request',
    LoadAllDevicesSuccess = '[Devices] Load All Devices Success',
    LoadAllDevicesFailure = '[Devices] Load All Devices Failure',
    LoadSingleDeviceRequest = '[Devices] Load Single Device Request',
    LoadSingleDeviceSuccess = '[Devices] Load Single Device Success',
    SetSelectedDevice = '[Devices] Set Selected Device'
}

/**
 * Load all devices
 */
export class LoadAllDevicesRequest implements Action {
    readonly type = DevicesActionTypes.LoadAllDevicesRequest;

    constructor() {
    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDevicesSuccess implements Action {
    readonly type = DevicesActionTypes.LoadAllDevicesSuccess;

    constructor(public payload: { devices: IDevice[] }) {

    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDevicesFailure implements Action {
    readonly type = DevicesActionTypes.LoadAllDevicesFailure;
}

/**
 * Load all devices
 */
export class LoadSingleDeviceRequest implements Action {
    readonly type = DevicesActionTypes.LoadSingleDeviceRequest;

    constructor() {
    }
}

/**
 * Load all devices
 */
export class LoadSingleDeviceSuccess implements Action {
    readonly type = DevicesActionTypes.LoadSingleDeviceSuccess;

    constructor(public payload: { device: IDevice }) {

    }
}

/**
 * Load all devices successfully
 */
export class SetSelectedDevice implements Action {
    readonly type = DevicesActionTypes.SetSelectedDevice;
    constructor(public payload: { deviceId: number }) {
    }
}

/**
 * Export union of devices Action
 */
export type DevicesActionsUnion =
    | LoadAllDevicesRequest
    | LoadAllDevicesSuccess
    | LoadAllDevicesFailure
    | LoadSingleDeviceRequest
    | LoadSingleDeviceSuccess
    | SetSelectedDevice;

