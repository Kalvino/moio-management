import { DevicesApiActions, DevicesActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createDeviceError: string | null;
  createDevicePending: boolean;
  editDeviceError: string | null;
  editDevicePending: boolean;
  loadDeviceReportsPending: boolean;
  loadDeviceReportsError: null;
}

export const initialState: State = {
  error: null,
  pending: false,
  createDeviceError: null,
  createDevicePending: false,
  editDeviceError: null,
  editDevicePending: false,
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
  action: DevicesApiActions.DevicesApiActionsUnion
    | DevicesActions.DevicesActionsUnion): State {
  switch (action.type) {

    case (DevicesActions.DevicesActionTypes.LoadDevices):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (DevicesActions.DevicesActionTypes.EditDevice):
      return {
        ...state,
        editDevicePending: true,
        editDeviceError: null
      };

    case (DevicesActions.DevicesActionTypes.CreateDevice):
      return {
        ...state,
        createDevicePending: true
      };

    case (DevicesApiActions.DevicesApiActionTypes.CreateDeviceFailure):
      return {
        ...state,
        createDevicePending: false,
        createDeviceError: action.payload.messages
      };

    case (DevicesApiActions.DevicesApiActionTypes.CreateDeviceSuccess):
      return {
        ...state,
        createDevicePending: false,
        createDeviceError: null
      };

    case (DevicesApiActions.DevicesApiActionTypes.LoadDevicesSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };


    case (DevicesApiActions.DevicesApiActionTypes.EditDeviceSuccess):
      return {
        ...state,
        editDevicePending: false,
        editDeviceError: null
      };

    case (DevicesActions.DevicesActionTypes.DismissEditDevice):
      return {
        ...state,
        error: null
      }

    case (DevicesApiActions.DevicesApiActionTypes.LoadDevicesFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case (DevicesApiActions.DevicesApiActionTypes.EditDeviceFailure):
      return {
        ...state,
        editDevicePending: false,
        editDeviceError: action.payload.message
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
export const getCreateDeviceError = (state: State) => state.createDeviceError;

/**
 * get the pending state when creating user
 * @param state
 */
export const getCreateDevicePending = (state: State) => state.createDevicePending;

/**
 * get the current error state when editing user
 * @param state
 */
export const getEditDeviceError = (state: State) => state.editDeviceError;

/**
 * get the pending state when editing user
 * @param state
 */
export const getEditDevicePending = (state: State) => state.editDevicePending;

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

