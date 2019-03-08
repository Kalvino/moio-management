import { NursingHomesApiActions, NursingHomesActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
  createNursingHomeError: string | null;
  createNursingHomePending: boolean;
  editNursingHomeError: string | null;
  editNursingHomePending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  createNursingHomeError: null,
  createNursingHomePending: false,
  editNursingHomeError: null,
  editNursingHomePending: false,
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



