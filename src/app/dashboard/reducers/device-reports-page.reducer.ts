import { DeviceReportsApiActions, DeviceReportsActions } from '../actions';

export interface State {
  loadDeviceReportsPending: boolean;
  loadDeviceReportsError: null;
}

export const initialState: State = {
  loadDeviceReportsPending: false,
  loadDeviceReportsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: DeviceReportsApiActions.DeviceReportsApiActionsUnion
    | DeviceReportsActions.DeviceReportsActionsUnion): State {
  switch (action.type) {

    case (DeviceReportsActions.DeviceReportsActionTypes.LoadDeviceReports):
      return {
        ...state,
        loadDeviceReportsPending: true,
        loadDeviceReportsError: null
      };

    case (DeviceReportsApiActions.DeviceReportsApiActionTypes.LoadDeviceReportsSuccess):
      return {
        ...state,
        loadDeviceReportsPending: false,
        loadDeviceReportsError: null
      };
    
    case (DeviceReportsApiActions.DeviceReportsApiActionTypes.LoadDeviceReportsFailure):
      return {
        ...state,
        loadDeviceReportsPending: false,
        loadDeviceReportsError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the pending state when loading user patients
 * @param state
 */
export const getLoadDeviceReportsPending = (state: State) => state.loadDeviceReportsPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getLoadDeviceReportsError = (state: State) => state.loadDeviceReportsError;

