import { User } from '../models/user.interface';

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
  action: any): State {

  switch (action.type) {
    default:
      return state;

  }
}

export const getUser = (state: State) => state.user;
export const getAccessToken = (state: State) => state.access_token;
