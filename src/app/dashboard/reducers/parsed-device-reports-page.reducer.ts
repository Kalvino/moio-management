import { ParsedDeviceReportsApiActions, ParsedDeviceReportsActions } from '../actions';

export interface State {
    loadParsedDeviceReportsPending: boolean;
    loadParsedDeviceReportsError: null;
}

export const initialState: State = {
    loadParsedDeviceReportsPending: false,
    loadParsedDeviceReportsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: ParsedDeviceReportsApiActions.ParsedDeviceReportsApiActionsUnion
    | ParsedDeviceReportsActions.ParsedDeviceReportsActionsUnion): State {
  switch (action.type) {

    case (ParsedDeviceReportsActions.ParsedDeviceReportsActionTypes.LoadDeviceParsedReports):
      return {
        ...state,
        loadParsedDeviceReportsPending: true,
        loadParsedDeviceReportsError: null
      };

    case (ParsedDeviceReportsApiActions.ParsedDeviceReportsApiActionTypes.LoadParsedDeviceReportsSuccess):
      return {
        ...state,
        loadParsedDeviceReportsPending: false,
        loadParsedDeviceReportsError: null
      };
    
    case (ParsedDeviceReportsApiActions.ParsedDeviceReportsApiActionTypes.LoadParsedDeviceReportsFailure):
      return {
        ...state,
        loadParsedDeviceReportsPending: false,
        loadParsedDeviceReportsError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the pending state when loading device parsed reports
 * @param state
 */
export const getLoadParsedDeviceReportsPending = (state: State) => state.loadParsedDeviceReportsPending;

/**
 * get the error state when loading device raw reports
 * @param state
 */
export const getLoadParsedDeviceReportsError = (state: State) => state.loadParsedDeviceReportsError;

