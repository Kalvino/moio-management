import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Logout = '[Auth] Logout',
  LogoutConfirmation = '[Auth] Logout Confirmation',
  LogoutConfirmationDismiss = '[Auth] Logout Confirmation Dismiss'
}

/**
 * action to logout
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

/**
 * action to confirm logout (user interaction)
 */
export class LogoutConfirmation implements Action {
  readonly type = AuthActionTypes.LogoutConfirmation;
}

/**
 * action if user dismisses the modal
 */
export class LogoutConfirmationDismiss implements Action {
  readonly type = AuthActionTypes.LogoutConfirmationDismiss;
}

export type AuthActionsUnion =
  | Logout
  | LogoutConfirmation
  | LogoutConfirmationDismiss;
