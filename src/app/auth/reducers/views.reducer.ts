export interface State {
  loginError: string | null;
  registerError: string | null;
  forgotError: string | null;
  pending: boolean;
}

export const initialState: State = {
  loginError: null,
  registerError: null,
  forgotError: null,
  pending: false
};

export function reducer(
  state: State = initialState,
  action: any): State {

  switch (action.type) {

    default:
      return state;
  }

}

export const getLoginError = (state: State) => state.loginError;
export const getRegisterError = (state: State) => state.registerError;
export const getForgotError = (state: State) => state.forgotError;
export const getPending = (state: State) => state.pending;
