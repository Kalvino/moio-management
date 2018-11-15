import { Action } from '@ngrx/store';

export enum AuthApiActionTypes {
  LoginSuccess = '[Auth/Api] Login Success',
  LoginFailure = '[Auth/Api] Login Failure',
  LoginRedirect = '[Auth/Api] Login Redirect',
  LogoutSuccess = '[Auth/Api] Logout Success',
  LogoutFailure = '[Auth/Api] Logout Failure',
  SignUpSuccess = '[Auth/Api] Sign Up Success',
  SignUpFailure = '[Auth/Api] Sign Up Failure',
  ForgotPasswordSuccess = '[Auth/Api] Forgot Password Success',
  ForgotPasswordFailure = '[Auth/Api] Forgot Password Failure',
}

/**
 * login action
 */
export class LoginSuccess implements Action {
  readonly type = AuthApiActionTypes.LoginSuccess;

  constructor(public payload: { response: any }) {
  }
}

/**
 * login failure
 */
export class LoginFailure implements Action {
  readonly type = AuthApiActionTypes.LoginFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * logout success
 */
export class LogoutSuccess implements Action {
  readonly type = AuthApiActionTypes.LogoutSuccess;
}

/**
 * lougout failure
 */
export class LogoutFailure implements Action {
  readonly type = AuthApiActionTypes.LogoutFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * redirect action
 */
export class LoginRedirect implements Action {
  readonly type = AuthApiActionTypes.LoginRedirect;
}

/**
 * sign up success
 */
export class SignUpSuccess implements Action {
  readonly type = AuthApiActionTypes.SignUpSuccess;

  constructor(public payload: { message: any }) {
  }
}

/**
 * sign up failure
 */
export class SignUpFailure implements Action {
  readonly type = AuthApiActionTypes.SignUpFailure;

  constructor(public payload: { message: any }) {
  }
}

/**
 * sign up success
 */
export class ForgotPasswordSuccess implements Action {
  readonly type = AuthApiActionTypes.ForgotPasswordSuccess;

  constructor(public payload: { message: any }) {
  }
}

/**
 * sign up failure
 */
export class ForgotPasswordFailure implements Action {
  readonly type = AuthApiActionTypes.ForgotPasswordFailure;

  constructor(public payload: { message: any }) {
  }
}

export type AuthApiActionsUnion =
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | LogoutSuccess
  | LogoutFailure
  | SignUpSuccess
  | SignUpFailure
  | ForgotPasswordSuccess
  | ForgotPasswordFailure;

