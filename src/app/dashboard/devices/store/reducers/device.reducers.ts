import * as deviceActions from '../actions/device.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IDevice} from '../../../models/device.model';
import * as deviceLogsActions from '../actions/device-logs.actions';


export interface DeviceState extends EntityState<IDevice> {
    loading: boolean;
    allDevicesLoaded: boolean;
    selectedDeviceId: number;
}

export const adapter: EntityAdapter<IDevice> =
    createEntityAdapter<IDevice>();


export const initialDeviceState: DeviceState = adapter.getInitialState({
    loading: true,
    allDevicesLoaded: false,
    selectedDeviceId: null
});


export function deviceReducer(
    state: DeviceState = initialDeviceState,
    action: deviceActions.DevicesActionsUnion
): DeviceState {

    switch (action.type) {

        // Request loading all devices
        case deviceActions.DevicesActionTypes.LoadAllDevicesRequest:
            return {
                ...state,
                loading: true
            };

        // Get all devices
        case deviceActions.DevicesActionTypes.LoadAllDevicesSuccess:
            return adapter.addAll(action.payload.devices, {...state, loading: false});

        // Get all devices
        case deviceActions.DevicesActionTypes.LoadSingleDeviceSuccess:
            return adapter.addOne(action.payload.device, {...state, loading: false});

        case deviceActions.DevicesActionTypes.SetSelectedDevice:
            return {...state, selectedDeviceId: action.payload.deviceId};

        default:
            return state;
    }


}

// export const getDevicesEntities = (state: DeviceState) => state;
export const getDevicesEntities = (state: DeviceState) => state.entities;

export const {
    selectAll
} = adapter.getSelectors();








