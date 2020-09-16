import { UsersApiActions, UsersActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createUserError: string | null;
  createUserPending: boolean;
  editUserError: string | null;
  editUserPending: boolean;
  loadUserPatientsPending: boolean;
  loadUserPatientsError: null;
}

export const initialState: State = {
  error: null,
  pending: false,
  createUserError: null,
  createUserPending: false,
  editUserError: null,
  editUserPending: false,
  loadUserPatientsPending: false,
  loadUserPatientsError: null
};

/**
 * reducer for users page
 *
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action: UsersApiActions.UsersApiActionsUnion
    | UsersActions.UsersActionsUnion): State {
  switch (action.type) {

    case (UsersActions.UsersActionTypes.LoadUsers):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (UsersActions.UsersActionTypes.EditUser):
      return {
        ...state,
        editUserPending: true,
        editUserError: null
      };

    case (UsersActions.UsersActionTypes.LoadUserPatients):
      return {
        ...state,
        loadUserPatientsPending: true,
        loadUserPatientsError: null
      };

    case (UsersActions.UsersActionTypes.CreateUser):
      return {
        ...state,
        createUserPending: true
      };

    case (UsersApiActions.UsersApiActionTypes.CreateUserFailure):
      return {
        ...state,
        createUserPending: false,
        createUserError: action.payload.messages
      };

    case (UsersApiActions.UsersApiActionTypes.CreateUserSuccess):
      return {
        ...state,
        createUserPending: false,
        createUserError: null
      };

    case (UsersApiActions.UsersApiActionTypes.LoadUsersSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (UsersApiActions.UsersApiActionTypes.LoadUserPatientsSuccess):
      return {
        ...state,
        loadUserPatientsPending: false,
        loadUserPatientsError: null
      };

    case (UsersApiActions.UsersApiActionTypes.LoadUserPatientsFailure):
      return {
        ...state,
        loadUserPatientsPending: false,
        loadUserPatientsError: action.payload.message
      };

    case (UsersApiActions.UsersApiActionTypes.EditUserSuccess):
      return {
        ...state,
        editUserPending: false,
        editUserError: null
      };

    case (UsersActions.UsersActionTypes.DismissEditUser):
      return {
        ...state,
        error: null
      }

    case (UsersApiActions.UsersApiActionTypes.LoadUsersFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    case (UsersApiActions.UsersApiActionTypes.EditUserFailure):
      return {
        ...state,
        editUserPending: false,
        editUserError: action.payload.message
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
export const getCreateUserError = (state: State) => state.createUserError;

/**
 * get the pending state when creating user
 * @param state
 */
export const getCreateUserPending = (state: State) => state.createUserPending;

/**
 * get the current error state when editing user
 * @param state
 */
export const getEditUserError = (state: State) => state.editUserError;

/**
 * get the pending state when editing user
 * @param state
 */
export const getEditUserPending = (state: State) => state.editUserPending;

/**
 * get the pending state when loading user patients
 * @param state
 */
export const getLoadUserPatientsPending = (state: State) => state.loadUserPatientsPending;

/**
 * get the error state when loading user patients
 * @param state
 */
export const getLoadUserPatientsError = (state: State) => state.loadUserPatientsError;

