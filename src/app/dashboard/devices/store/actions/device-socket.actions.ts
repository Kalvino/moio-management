import {Action} from '@ngrx/store';
import {IDeviceLogs} from '../../model/device-logs.model';

export enum DeviceSocketActionTypes {
    ConnectClient = '[Devices/Socket] Connect Client',
    DisconnectClient = '[Devices/Socket] Disconnect Client',
    Subscribe = '[Devices/Socket] Subscribe',
    Unsubscribe = '[Devices/Socket] Unubscribe',
}

export class ConnectClient implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceSocketActionTypes.ConnectClient;

}

/**
 * action to disconnect the notifications WS client
 */
export class DisconnectClient implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceSocketActionTypes.DisconnectClient;

}

/**
 * action to disconnect the notifications WS client
 */
export class Subscribe implements Action {
    /**
     * type assign string to the type class
     */
    readonly type = DeviceSocketActionTypes.Subscribe;

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
    readonly type = DeviceSocketActionTypes.Unsubscribe;

    constructor(public payload: { userId: number }) {
    }

}


/**
 * Export union of devices Action
 */
export type DeviceSocketsActionsUnion =
    | ConnectClient
    | DisconnectClient
    | Subscribe
    | Unsubscribe;


