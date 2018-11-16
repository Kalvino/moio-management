import { User } from '../models/user.interface';
import { AuthApiActions, AuthActions } from '../actions';

/**
 * auth state
 */
export interface State {
  user: User | null;
  access_token: string | null;
}

export const initialState: State = {
  user: null,
  access_token: null
};

export function reducer(
  state: State = initialState,
  action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion): State {

  switch (action.type) {

    case AuthApiActions.AuthApiActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload.response.user,
        access_token: action.payload.response.access_token
      };

    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
      return initialState;

    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
export const getAccessToken = (state: State) => state.access_token;
