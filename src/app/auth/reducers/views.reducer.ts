import { AuthActions, AuthApiActions, AuthPageActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(
  state: State = initialState,
  action: AuthActions.AuthActionsUnion
    | AuthApiActions.AuthApiActionsUnion
    | AuthPageActions.AuthPageActionsUnion): State {

  switch (action.type) {

    case AuthPageActions.AuthPageActionTypes.Login:
      return {
        ...state,
        pending: true,
        error: null
      };

    case AuthApiActions.AuthApiActionTypes.LoginSuccess:
      return {
        ...state,
        pending: false,
        error: null
      };

    case AuthApiActions.AuthApiActionTypes.LoginFailure:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };

    default:
      return state;
  }

}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
