/**
 * login action types
 */
import { Action } from '@ngrx/store';
import { ICredentials } from '../models/user.interface';

export enum AuthPageActionTypes {
  Login = '[Auth/Login Page] Login',
  Signup = '[Auth/Signup Page] Signup',
  ForgotPassword = '[Auth/Forgot Password Page] Forgot Password'
}

/**
 * Login action
 */
export class Login implements Action {
  readonly type = AuthPageActionTypes.Login;

  constructor(public payload: { credentials: ICredentials }) {
  }
}

/**
 * signup action
 */
export class Signup implements Action {
  readonly type = AuthPageActionTypes.Signup;

  constructor(public payload: { credentials: ICredentials }) {
  }
}

/**
 * action for the forgot password page
 */
export class ForgotPassword implements Action {
  readonly type = AuthPageActionTypes.ForgotPassword;

  constructor(public payload: { email: string }) {
  }
}

export type AuthPageActionsUnion =
  | Login
  | Signup
  | ForgotPassword;
