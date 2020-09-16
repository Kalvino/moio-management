import { PatientsApiActions, PatientsActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createPatientError: string | null;
  createPatientPending: boolean;
  editPatientError: string | null;
  editPatientPending: boolean;
  loadPatientUsersPending: boolean;
  loadPatientUsersError: string | null;

}

export const initialState: State = {
  error: null,
  pending: false,
  createPatientError: null,
  createPatientPending: false,
  editPatientError: null,
  editPatientPending: false,
  loadPatientUsersPending: false,
  loadPatientUsersError: null
};

/**
 * reducer for patients page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: PatientsApiActions.PatientsApiActionsUnion
    | PatientsActions.PatientsActionsUnion): State {
  switch (action.type) {

    case (PatientsActions.PatientsActionTypes.LoadPatients):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (PatientsActions.PatientsActionTypes.EditPatient):
      return {
        ...state,
        editPatientPending: true,
        editPatientError: null
      };

    case (PatientsActions.PatientsActionTypes.CreatePatient):
      return {
        ...state,
        createPatientPending: true
      };
    
    case (PatientsApiActions.PatientsApiActionTypes.CreatePatientFailure):
      return {
        ...state,
        createPatientPending: false,
        createPatientError: action.payload.messages
      };

    case (PatientsApiActions.PatientsApiActionTypes.CreatePatientSuccess):
      return {
        ...state,
        createPatientPending: false,
        createPatientError: null
      };

    case (PatientsApiActions.PatientsApiActionTypes.LoadPatientsSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (PatientsApiActions.PatientsApiActionTypes.EditPatientSuccess):
      return {
        ...state,
        editPatientPending: false,
        editPatientError: null
      };

    case (PatientsActions.PatientsActionTypes.DismissEditPatient):
      return {
        ...state,
        error: null
      }

    case (PatientsApiActions.PatientsApiActionTypes.LoadPatientsFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };
    
    case (PatientsApiActions.PatientsApiActionTypes.EditPatientFailure):
      return {
        ...state,
        editPatientPending: false,
        editPatientError: action.payload.message
      };

    default:
      return state;

  }
}

/**
 * get the current error state for patient pages
 * @param state
 */
export const getError = (state: State) => state.error;

/**
 * get the pending state for the patient pages
 * @param state
 */
export const getPending = (state: State) => state.pending;

/**
 * get the current error state when creating patient
 * @param state
 */
export const getCreatePatientError = (state: State) => state.createPatientError;

/**
 * get the pending state when creating patient
 * @param state
 */
export const getCreatePatientPending = (state: State) => state.createPatientPending;

/**
 * get the current error state when editing patient
 * @param state
 */
export const getEditPatientError = (state: State) => state.editPatientError;

/**
 * get the pending state when editing patient
 * @param state
 */
export const getEditPatientPending = (state: State) => state.editPatientPending;

/**
 * get the pending state when loading user patients
 * @param state
 */
export const getLoadPatientUsersPending = (state: State) => state.loadPatientUsersPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getLoadPatientUsersError = (state: State) => state.loadPatientUsersError;
