import { ReportsApiActions, ReportsActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createReportError: string | null;
  createReportPending: boolean;
  editReportError: string | null;
  editReportPending: boolean;
  loadReportPatientsPending: boolean;
  LoadReportPatientsError: null;
}

export const initialState: State = {
  error: null,
  pending: false,
  createReportError: null,
  createReportPending: false,
  editReportError: null,
  editReportPending: false,
  loadReportPatientsPending: false,
  LoadReportPatientsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: ReportsApiActions.ReportsApiActionsUnion
    | ReportsActions.ReportsActionsUnion): State {
  switch (action.type) {

    case (ReportsActions.ReportsActionTypes.LoadReports):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (ReportsActions.ReportsActionTypes.EditReport):
      return {
        ...state,
        editReportPending: true,
        editReportError: null
      };

    case (ReportsActions.ReportsActionTypes.LoadReportPatients):
      return {
        ...state,
        loadReportPatientsPending: true,
        LoadReportPatientsError: null
      };

    case (ReportsActions.ReportsActionTypes.CreateReport):
      return {
        ...state,
        createReportPending: true
      };
    
    case (ReportsApiActions.ReportsApiActionTypes.CreateReportFailure):
      return {
        ...state,
        createReportPending: false,
        createReportError: action.payload.messages
      };

    case (ReportsApiActions.ReportsApiActionTypes.CreateReportSuccess):
      return {
        ...state,
        createReportPending: false,
        createReportError: null
      };

    case (ReportsApiActions.ReportsApiActionTypes.LoadReportsSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (ReportsApiActions.ReportsApiActionTypes.EditReportSuccess):
      return {
        ...state,
        editReportPending: false,
        editReportError: null
      };

    case (ReportsActions.ReportsActionTypes.DismissEditReport):
      return {
        ...state,
        error: null
      }

    case (ReportsApiActions.ReportsApiActionTypes.LoadReportsFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };
    
    case (ReportsApiActions.ReportsApiActionTypes.EditReportFailure):
      return {
        ...state,
        editReportPending: false,
        editReportError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the current error state for user pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the user pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating user
 * @param state
 */
export const getCreateReportError = (state: State) => state.createReportError;

/**
 * get the pending state when creating user
 * @param state
 */
export const getCreateReportPending = (state: State) => state.createReportPending;

/**
 * get the current error state when editing user
 * @param state
 */
export const getEditReportError = (state: State) => state.editReportError;

/**
 * get the pending state when editing user
 * @param state
 */
export const getEditReportPending = (state: State) => state.editReportPending;

/**
 * get the pending state when loading user patients
 * @param state
 */
export const getLoadReportPatientsPending = (state: State) => state.loadReportPatientsPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getLoadReportPatientsError = (state: State) => state.LoadReportPatientsError;

