import * as fromDevice from './device.reducers';
import * as fromDeviceSettings from './device-settings.reducers';
import * as fromDeviceLogs from './device-logs.reducers';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface DeviceState {
    devices: fromDevice.DeviceState;
    deviceSettings: fromDeviceSettings.DeviceSettingsState;
    deviceLogs: fromDeviceLogs.DeviceLogsState;
}

export const reducers: ActionReducerMap<DeviceState> = {
    devices: fromDevice.deviceReducer,
    deviceSettings: fromDeviceSettings.deviceSettingsReducer,
    deviceLogs: fromDeviceLogs.deviceLogsReducer
};

export const getDeviceState = createFeatureSelector<DeviceState>('deviceState');



