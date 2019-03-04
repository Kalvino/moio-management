import * as deviceSettingsActions from '../actions/device-settings.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IDevice} from '../../../models/device.model';
import {IDeviceSetting} from '../../model/device-settings.model';


export interface DeviceSettingsState extends EntityState<IDeviceSetting> {
    loading: boolean;
    allDevicesLoaded: boolean;
}

export const adapter: EntityAdapter<IDeviceSetting> =
    createEntityAdapter<IDeviceSetting>();


export const initialDeviceSettingsState: DeviceSettingsState = adapter.getInitialState({
    loading: true,
    allDevicesLoaded: false
});


export function deviceSettingsReducer(
    state: DeviceSettingsState = initialDeviceSettingsState,
    action: deviceSettingsActions.DeviceSettingsActionsUnion
): DeviceSettingsState {

    switch (action.type) {

        // // Request loading all devices
        // case deviceSettingsActions.DevicesActionTypes.LoadAllDevicesRequest:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        // Get all devices
        case deviceSettingsActions.DeviceSettingsActionTypes.LoadAllDeviceSettingsSuccess:
            // return adapter.updateOne({ id: 0, changes: action.payload.device }, {...state, loading: false});
            return adapter.addMany(action.payload.deviceSettings, {...state, loading: false});
            // return adapter.addOne(action.payload.device, {...state, loading: false});

        default:
            return state;
    }


}

// export const getDevicesEntities = (state: DeviceState) => state;
export const getDevicesEntities = (state: DeviceSettingsState) => state.entities;

export const {
    selectAll
} = adapter.getSelectors();








