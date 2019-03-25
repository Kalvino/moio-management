import * as fromDevice from './device.reducers';
import * as fromDeviceSettings from './device-settings.reducers';
import * as fromDeviceLogs from './device-logs.reducers';
import * as fromDeviceReports from './device-reports.reducers';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface DeviceState {
    devices: fromDevice.DeviceState;
    deviceSettings: fromDeviceSettings.DeviceSettingsState;
    deviceLogs: fromDeviceLogs.DeviceLogsState;
    deviceReports: fromDeviceReports.DeviceReportsState;
}

export const reducers: ActionReducerMap<DeviceState> = {
    devices: fromDevice.deviceReducer,
    deviceSettings: fromDeviceSettings.deviceSettingsReducer,
    deviceLogs: fromDeviceLogs.deviceLogsReducer,
    deviceReports: fromDeviceReports.deviceReportsReducer
};

export const getDeviceState = createFeatureSelector<DeviceState>('deviceState');



