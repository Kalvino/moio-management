import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';


export const selectAllDevices = createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        const allDevices = Object.values(deviceState.devices.entities);
        return allDevices;
    }
);

export const selectDeviceById = (deviceId: number) => createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return deviceState.devices.entities[deviceId];
    }
);

export const getDeviceLoadingState = createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return deviceState.devices.loading;
    }
);


