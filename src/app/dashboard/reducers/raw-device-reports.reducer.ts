import { RawDeviceReportsApiActions, RawDeviceReportsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { IRawDeviceReport } from '../models/raw-device-report.model';

// state interface definition
export interface State extends EntityState<IRawDeviceReport> {
}

// extend & export entity adapter
export const adapter: EntityAdapter<IRawDeviceReport> = createEntityAdapter<IRawDeviceReport>({
  selectId: (report: IRawDeviceReport) => report.id,
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
    | RawDeviceReportsApiActions.RawDeviceReportsApiActionsUnion
    | RawDeviceReportsActions.RawDeviceReportsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load raw device reports success action
    case RawDeviceReportsApiActions.RawDeviceReportsApiActionTypes.LoadRawDeviceReportsSuccess:
      return adapter.upsertMany(action.payload.rawDeviceReports, state);

    // load selected device's raw reports
    case (RawDeviceReportsActions.RawDeviceReportsActionTypes.LoadDeviceRawReports):
      return adapter.removeAll(state)

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
      return initialState;

    default:
      return state;
  }

}
