import * as deviceLogsActions from '../actions/device-logs.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IDeviceLogs} from '../../model/device-logs.model';


export interface DeviceLogsState extends EntityState<IDeviceLogs> {
    loading: boolean;
    allDevicesLoaded: boolean;
}

export const adapter: EntityAdapter<IDeviceLogs> =
    createEntityAdapter<IDeviceLogs>();


export const initialDeviceLogsState: DeviceLogsState = adapter.getInitialState({
    loading: true,
    allDevicesLoaded: false,
});


export function deviceLogsReducer(
    state: DeviceLogsState = initialDeviceLogsState,
    action: deviceLogsActions.DeviceLogsActionsUnion
): DeviceLogsState {

    switch (action.type) {

        // Get all devices
        case deviceLogsActions.DeviceLogsActionTypes.LoadAllDeviceLogsSuccess:
            return adapter.addMany(action.payload.deviceLogs, {...state, loading: false});

        // WS incoming notifications
        case deviceLogsActions.DeviceLogsActionTypes.IncomingLogs:
            return adapter.upsertOne(action.payload.deviceLogs, state);

        default:
            return state;
    }


}

// export const getDevicesEntities = (state: DeviceState) => state;
export const getDevicesEntities = (state: DeviceLogsState) => state.entities;

export const {
    selectAll
} = adapter.getSelectors();








