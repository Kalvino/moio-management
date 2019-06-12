import { RawDeviceReportsApiActions, RawDeviceReportsActions } from '../actions';

export interface State {
    loadRawDeviceReportsPending: boolean;
    loadRawDeviceReportsError: null;
}

export const initialState: State = {
    loadRawDeviceReportsPending: false,
    loadRawDeviceReportsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: RawDeviceReportsApiActions.RawDeviceReportsApiActionsUnion
    | RawDeviceReportsActions.RawDeviceReportsActionsUnion): State {
  switch (action.type) {

    case (RawDeviceReportsActions.RawDeviceReportsActionTypes.LoadDeviceRawReports):
      return {
        ...state,
        loadRawDeviceReportsPending: true,
        loadRawDeviceReportsError: null
      };

    case (RawDeviceReportsApiActions.RawDeviceReportsApiActionTypes.LoadRawDeviceReportsSuccess):
      return {
        ...state,
        loadRawDeviceReportsPending: false,
        loadRawDeviceReportsError: null
      };
    
    case (RawDeviceReportsApiActions.RawDeviceReportsApiActionTypes.LoadRawDeviceReportsFailure):
      return {
        ...state,
        loadRawDeviceReportsPending: false,
        loadRawDeviceReportsError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the pending state when loading device raw reports
 * @param state
 */
export const getLoadRawDeviceReportsPending = (state: State) => state.loadRawDeviceReportsPending;

/**
 * get the error state when loading device raw reports
 * @param state
 */
export const getLoadRawDeviceReportsError = (state: State) => state.loadRawDeviceReportsError;

