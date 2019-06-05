import { ParsedDeviceReportsApiActions, ParsedDeviceReportsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { IParsedDeviceReport } from '../models/parsed-device-report.model';

// state interface definition
export interface State extends EntityState<IParsedDeviceReport> {
}

// extend & export entity adapter
export const adapter: EntityAdapter<IParsedDeviceReport> = createEntityAdapter<IParsedDeviceReport>({
  selectId: (report: IParsedDeviceReport) => report.id,
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
    | ParsedDeviceReportsApiActions.ParsedDeviceReportsApiActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load device reports success state
    case ParsedDeviceReportsApiActions.ParsedDeviceReportsApiActionTypes.LoadParsedDeviceReportsSuccess:
      return adapter.upsertMany(action.payload.parsedDeviceReports, state);

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
      return initialState;

    default:
      return state;
  }

}
