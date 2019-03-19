import {Action} from '@ngrx/store';
import {IDeviceLogs} from '../../model/device-logs.model';

export enum DeviceLogsActionTypes {
    LoadAllDeviceLogsRequest = '[Devices] Load All Devices Logs Request',
    LoadAllDeviceLogsSuccess = '[Devices] Load All Devices Logs Success',
    LoadAllDeviceLogsFailure = '[Devices] Load All Devices Logs Failure',
    ConnectClient = '[Devices/WS] Connect Client',
    DisconnectClient = '[Devices/WS] Disconnect Client',
    Subscribe = '[Devices/WS] Subscribe',
    Unsubscribe = '[Devices/WS] Unubscribe',
    IncomingLogs = '[Devices/WS] Incoming Logs',
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
 * action to connect the notifications WS client
 */
export class ConnectClient implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceLogsActionTypes.ConnectClient;
}

/**
 * action to disconnect the notifications WS client
 */
export class DisconnectClient implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceLogsActionTypes.DisconnectClient;
}

/**
 * action to disconnect the notifications WS client
 */
export class Subscribe implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceLogsActionTypes.Subscribe;

    constructor(public payload: { deviceId: number }) {
    }

}

/**
 * action to disconnect the notifications WS client
 */
export class Unsubscribe implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceLogsActionTypes.Unsubscribe;

    constructor(public payload: { userId: number }) {
    }

}

/**
 * action to disconnect the notifications WS client
 */
export class IncomingLogs implements Action {
    /**
     * type assign string to the type class
     */
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
    | ConnectClient
    | DisconnectClient
    | Subscribe
    | Unsubscribe
    | IncomingLogs;


