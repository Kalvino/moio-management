import { DeviceReportsApiActions, DeviceReportsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { IDeviceReport } from '../models/device-report.model';

// state interface definition
export interface State extends EntityState<IDeviceReport> {
}

// extend & export entity adapter
export const adapter: EntityAdapter<IDeviceReport> = createEntityAdapter<IDeviceReport>({
  selectId: (report: IDeviceReport) => report.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
});

/**
 * reducer for the device reports state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | DeviceReportsApiActions.DeviceReportsApiActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load device reports success state
    case DeviceReportsApiActions.DeviceReportsApiActionTypes.LoadDeviceReportsSuccess:
      return adapter.upsertMany(action.payload.deviceReports, state);

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
      return initialState;

    default:
      return state;
  }

}
