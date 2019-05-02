import * as deviceCommandsActions from '../actions/device-commands.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IDevice} from '../../../models/device.model';
import {IDeviceSetting} from '../../model/device-settings.model';
import {IDeviceCommand} from '../../model/device-command.model';


export interface DeviceCommandsState extends EntityState<IDeviceCommand> {
    loading: boolean;
    allDeviceCommandsLoaded: boolean;
}

export const adapter: EntityAdapter<IDeviceCommand> =
    createEntityAdapter<IDeviceSetting>();


export const initialDeviceCommandsState: DeviceCommandsState = adapter.getInitialState({
    loading: true,
    allDeviceCommandsLoaded: false
});


export function deviceCommandsReducer(
    state: DeviceCommandsState = initialDeviceCommandsState,
    action: deviceCommandsActions.DeviceCommandsActionsUnion
): DeviceCommandsState {

    switch (action.type) {

        case deviceCommandsActions.DeviceCommandsActionTypes.LoadAllDeviceCommandsSuccess:
            return adapter.addMany(action.payload.deviceCommands, {...state, loading: false});

        default:
            return state;
    }


}

// // export const getDevicesEntities = (state: DeviceState) => state;
// export const getDevicesEntities = (state: DeviceSettingsState) => state.entities;
//
// export const {
//     selectAll
// } = adapter.getSelectors();








