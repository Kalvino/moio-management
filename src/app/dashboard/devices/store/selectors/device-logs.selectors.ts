import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';


export const selectDeviceLogsByDeviceId = (deviceId: number) => createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return Object.values(deviceState.deviceLogs.entities);
    }
);



