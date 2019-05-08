import { NursingHomesApiActions, NursingHomesActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createNursingHomeError: string | null;
  createNursingHomePending: boolean;
  editNursingHomeError: string | null;
  editNursingHomePending: boolean;
  loadNursingHomeGeofencingPending: boolean;
  loadNursingHomeGeofencingError: string | null;
  createNursingHomeGeofencingError: string | null;
  createNursingHomeGeofencingPending: boolean;
  editNursingHomeGeofencingError: string | null;
  editNursingHomeGeofencingPending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  createNursingHomeError: null,
  createNursingHomePending: false,
  editNursingHomeError: null,
  editNursingHomePending: false,
  loadNursingHomeGeofencingPending: false,
  loadNursingHomeGeofencingError: null,
  createNursingHomeGeofencingError: null,
  createNursingHomeGeofencingPending: false,
  editNursingHomeGeofencingError: null,
  editNursingHomeGeofencingPending: false
};

/**
 * reducer for nursingHomes page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: NursingHomesApiActions.NursingHomesApiActionsUnion
    | NursingHomesActions.NursingHomesActionsUnion): State {
  switch (action.type) {

    case (NursingHomesActions.NursingHomesActionTypes.LoadNursingHomeGeofencing):
      return {
        ...state,
        loadNursingHomeGeofencingPending: true,
        loadNursingHomeGeofencingError: null
      };

    case (NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomeGeofencingSuccess):
      return {
        ...state,
        loadNursingHomeGeofencingPending: false,
        loadNursingHomeGeofencingError: null
      };

    case (NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomeGeofencingFailure):
      return {
        ...state,
        loadNursingHomeGeofencingPending: false,
        loadNursingHomeGeofencingError: action.payload.message
      };

    case (NursingHomesActions.NursingHomesActionTypes.LoadNursingHomes):
    case (NursingHomesActions.NursingHomesActionTypes.EditNursingHome):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomesSuccess):
    case (NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeSuccess):
    case (NursingHomesApiActions.NursingHomesApiActionTypes.EditNursingHomeSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (NursingHomesActions.NursingHomesActionTypes.DismissEditNursingHome):
      return {
        ...state,
        error: null
      }

    case (NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomesFailure):
    case (NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeFailure):
    case (NursingHomesApiActions.NursingHomesApiActionTypes.EditNursingHomeFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case (NursingHomesActions.NursingHomesActionTypes.EditNursingHomeGeofencing):
      return {
        ...state,
        editNursingHomeGeofencingPending: true,
        editNursingHomeGeofencingError: null
      };

    case (NursingHomesActions.NursingHomesActionTypes.CreateNursingHomeGeofencing):
      return {
        ...state,
        createNursingHomeGeofencingPending: true
      };

    case (NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeGeofencingFailure):
      return {
        ...state,
        createNursingHomeGeofencingPending: false,
        createNursingHomeGeofencingError: action.payload.message
      };

    case (NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeGeofencingSuccess):
      return {
        ...state,
        createNursingHomeGeofencingPending: false,
        createNursingHomeGeofencingError: null
      };

    default:
      return state;

  }
}

/**
 * get the current error state for nursingHome pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the nursingHome pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating patient
 * @param state
 */
export const getCreateNursingHomeError = (state: State) => state.createNursingHomeError;

/**
 * get the pending state when creating patient
 * @param state
 */
export const getCreateNursingHomePending = (state: State) => state.createNursingHomePending;

/**
 * get the current error state when editing patient
 * @param state
 */
export const getEditNursingHomeError = (state: State) => state.editNursingHomeError;

/**
 * get the pending state when editing patient
 * @param state
 */
export const getEditNursingHomePending = (state: State) => state.editNursingHomePending;


/**
 * get the pending state when loading user patients
 * @param state
 */
export const getNursingHomeGeofencingPending = (state: State) => state.loadNursingHomeGeofencingPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getNursingHomeGeofencingError = (state: State) => state.loadNursingHomeGeofencingError;


/**
 * get the current error state when creating nursinghome geofence
 * @param state
 */
export const getCreateNursingHomeGeofencingError = (state: State) => state.createNursingHomeGeofencingError;

/**
 * get the pending state when creating nursinghome geofence
 * @param state
 */
export const getCreateNursingHomeGeofencingPending = (state: State) => state.createNursingHomeGeofencingPending;

/**
 * get the current error state when editing nursinghome geofence
 * @param state
 */
export const getEditNursingHomeGeofencingError = (state: State) => state.editNursingHomeGeofencingError;

/**
 * get the pending state when editing nursinghome geofence
 * @param state
 */
export const getEditNursingHomeGeofencingPending = (state: State) => state.editNursingHomeGeofencingPending;

