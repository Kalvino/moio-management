import { UsersApiActions, UsersActions } from '../actions';

export interface State {
  error: string | string[] | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

/**
 * reducer for patients page
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
    case (UsersActions.UsersActionTypes.EditUser):
      return {
        ...state,
        pending: true,
        error: null
      };

    case (UsersApiActions.UsersApiActionTypes.LoadUsersSuccess):
    case (UsersApiActions.UsersApiActionTypes.CreateUserSuccess):
    case (UsersApiActions.UsersApiActionTypes.EditUserSuccess):
      return {
        ...state,
        pending: false,
        error: null
      };

    case (UsersActions.UsersActionTypes.DismissEditUser):
      return {
        ...state,
        error: null
      }

    case (UsersApiActions.UsersApiActionTypes.LoadUsersFailure):
    case (UsersApiActions.UsersApiActionTypes.CreateUserFailure):
    case (UsersApiActions.UsersApiActionTypes.EditUserFailure):
      return {
        ...state,
        pending: false,
        error: action.payload.message
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
