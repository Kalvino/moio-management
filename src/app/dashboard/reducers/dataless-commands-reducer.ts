import { DeviceCommandsApiActions, DeviceCommandsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IDeviceCommand } from '../models/device-command.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IDeviceCommand> {
  selectedCommandId: number | null;
}

// extend & export entity adapater
export const adapter: EntityAdapter<IDeviceCommand> = createEntityAdapter<IDeviceCommand>({
  selectId: (command: IDeviceCommand) => command.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedCommandId: null
});

/**
 * reducer for the device commands state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | DeviceCommandsApiActions.DeviceCommandsApiActionsUnion
    | DeviceCommandsActions.DeviceCommandsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load device commands success state
    case DeviceCommandsApiActions.DeviceCommandsApiActionTypes.LoadDeviceCommandsSuccess:
      return adapter.upsertMany(action.payload.deviceCommands, state);

    // case select report
    case DeviceCommandsApiActions.DeviceCommandsApiActionTypes.SendDatalessCommandSuccess:
      return {
        ...state,
        selectedCommandId: action.payload.deviceCommand.id
      };

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected report id from the state
 * @param state
 * @param state the current state
 */
export const getFiredCommandId = (state: State) => state.selectedCommandId;
