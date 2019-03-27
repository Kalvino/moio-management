import {Action} from '@ngrx/store';
import {IDeviceLogs} from '../../model/device-logs.model';

export enum DeviceLogsActionTypes {
    LoadAllDeviceLogsRequest = '[Devices/Logs] Load All Devices Logs Request',
    LoadAllDeviceLogsSuccess = '[Devices/Logs] Load All Devices Logs Success',
    LoadAllDeviceLogsFailure = '[Devices/Logs] Load All Devices Logs Failure',
    IncomingLogs = '[Devices/Logs] Incoming Logs'
}

/**
 * Load all devices
 */
export class LoadAllDeviceLogsRequest implements Action {
    readonly type = DeviceLogsActionTypes.LoadAllDeviceLogsRequest;

    constructor(public deviceId: number) {
    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceLogsSuccess implements Action {
    readonly type = DeviceLogsActionTypes.LoadAllDeviceLogsSuccess;

    constructor(public payload: { deviceLogs: IDeviceLogs[] }) {

    }
}

/**
 * Load all devices successfully
 */
export class LoadAllDeviceLogsFailure implements Action {
    readonly type = DeviceLogsActionTypes.LoadAllDeviceLogsFailure;
}

/**
 * Load all devices successfully
 */
export class IncomingLogs implements Action {

    readonly type = DeviceLogsActionTypes.IncomingLogs;

    constructor(public payload: { deviceLogs: IDeviceLogs }) {

    }

}

/**
 * Export union of devices Action
 */
export type DeviceLogsActionsUnion =
    | LoadAllDeviceLogsRequest
    | LoadAllDeviceLogsSuccess
    | LoadAllDeviceLogsFailure
    | IncomingLogs;


