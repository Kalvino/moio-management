import * as fromAuth from './auth.reducer';
import * as fromViews from './views.reducer';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthApiActions } from '../actions';

const jwtHelper = new JwtHelperService();

export interface AuthState {
  userState: fromAuth.State;
  views: fromViews.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState, AuthApiActions.AuthApiActionsUnion> = {
  userState: fromAuth.reducer,
  views: fromViews.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthUserState = createSelector(
  selectAuthState,
  (state: AuthState) => state.userState
);

export const selectAuthViewsState = createSelector(
  selectAuthState,
  (state: AuthState) => state.views
);

export const getUser = createSelector(selectAuthUserState, fromAuth.getUser);
export const getAccessToken = createSelector(selectAuthUserState, fromAuth.getAccessToken);

export const isLoggedIn = createSelector(selectAuthUserState, state => {
  return state.user && state.access_token && !jwtHelper.isTokenExpired(state.access_token);
});

export const getPending = createSelector(
  selectAuthViewsState,
  fromViews.getPending
);

export const getError = createSelector(
  selectAuthViewsState,
  fromViews.getError
);
