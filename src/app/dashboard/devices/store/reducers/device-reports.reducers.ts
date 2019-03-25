import * as deviceReportsActions from '../actions/device-reports.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IDeviceLogs} from '../../model/device-logs.model';
import {select} from '@ngrx/store';
import {selectAllDevices, selectDeviceById} from '../selectors';

export interface DeviceReportsState extends EntityState<IDeviceLogs> {
}

export const adapter: EntityAdapter<IDeviceLogs> =
    createEntityAdapter<IDeviceLogs>();


export const initialDeviceReportsState: DeviceReportsState = adapter.getInitialState({
});


export function deviceReportsReducer(
    state: DeviceReportsState = initialDeviceReportsState,
    action: deviceReportsActions.DeviceReportsActionsUnion
): DeviceReportsState {

    switch (action.type) {

        // WS incoming notifications
        case deviceReportsActions.DeviceReportsActionTypes.IncomingReport:
            return adapter.upsertOne(action.payload.deviceReports, state);

        case deviceReportsActions.DeviceReportsActionTypes.DeleteReport:
            return adapter.removeOne(action.payload.id, state);

        case deviceReportsActions.DeviceReportsActionTypes.DeleteAllReport:
            return adapter.removeAll(state);

        default:
            return state;
    }

}

// export const getDevicesEntities = (state: DeviceState) => state;
export const getDevicesEntities = (state: DeviceReportsState) => state.entities;










