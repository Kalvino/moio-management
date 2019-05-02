import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectAllDeviceCommands = createSelector(
    fromFeature.getDeviceState,
    deviceState => {
        return Object.values(deviceState.deviceCommands.entities).filter((deviceCommand) => {
            return deviceCommand.used_in_management_tool === 1;
        });
    }
);



