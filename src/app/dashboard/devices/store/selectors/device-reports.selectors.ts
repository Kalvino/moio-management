import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectDeviceReportsByDeviceId = (deviceId: number) => createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return Object.values(deviceState.deviceReports.entities).filter((deviceLog) => {
            return deviceLog.device_id == deviceId;
        });
    }
);



export const getLastElements = (maxEntries: number) => createSelector(
    fromFeature.getDeviceState,
    deviceState => {

        let index;

        const removeEntries = [];

        for (index = 0; index < Object.values(deviceState.deviceReports.entities).length - maxEntries; index++) {
            removeEntries.push(Object.values(deviceState.deviceReports.entities)[index]['id']);
        }

        return removeEntries;

    }
);
