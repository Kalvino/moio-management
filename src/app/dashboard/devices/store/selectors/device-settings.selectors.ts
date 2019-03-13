import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';


export const selectAllDeviceSettings = createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return Object.values(deviceState.deviceSettings.entities);
    }
);

export const selectDeviceSettingsByDeviceId = (deviceId: number) => createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return Object.values(deviceState.deviceSettings.entities);
    }
);

// export const getDeviceLoadingState = createSelector(
//     fromFeature.getDeviceState,
//     deviceState => {
//         return deviceState.devices.loading;
//     }
// );


