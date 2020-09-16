import { DevicesApiActions, DevicesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IDevice } from '../models/device.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IDevice> {
  selectedDeviceId: number | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<IDevice> = createEntityAdapter<IDevice>({
  selectId: (device: IDevice) => device.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedDeviceId: null
});

/**
 * reducer for the devices state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | DevicesApiActions.DevicesApiActionsUnion
    | DevicesActions.DevicesActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load devices success state
    case DevicesApiActions.DevicesApiActionTypes.LoadDevicesSuccess:
      return adapter.upsertMany(action.payload.devices, state);

    // add a new entity to the state in case creation is successful
    case DevicesApiActions.DevicesApiActionTypes.CreateDeviceSuccess:
      return adapter.addOne(action.payload.device, state);

    case DevicesApiActions.DevicesApiActionTypes.EditDeviceSuccess:
      return adapter.upsertOne(action.payload.device, state);

    // case select device
    case DevicesActions.DevicesActionTypes.SelectDevice:
      return {
        ...state,
        selectedDeviceId: action.payload.id
      };

    // clear selected device
    case (DevicesActions.DevicesActionTypes.DismissEditDevice):
      return {
        ...state,
        selectedDeviceId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case DevicesActions.DevicesActionTypes.ResetDevicesState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected device id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedDeviceId = (state: State) => state.selectedDeviceId;
