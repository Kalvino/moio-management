import * as fromRoot from '../../reducers';
import * as fromLayout from './layout.reducer';
import * as fromUsers from './users.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose dashboard state for global store
 */
export interface DashboardState {
  layout: fromLayout.State;
  users: fromUsers.UsersState;
}

/**
 * assign state to global store
 */
export interface State extends fromRoot.State {
  dashboard: DashboardState;
}

/**
 * compose action reducers
 */
export const reducers: ActionReducerMap<DashboardState> = {
  layout: fromLayout.reducer,
  users: fromUsers.usersReducer
};

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getLayoutState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.layout
);

export const getUsersState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.users
);

/**
 * Users selectors
 */
export const getAllUsers = createSelector(getUsersState, fromUsers.selectAllUsers );
export const getAllUsersLoaded = createSelector(getUsersState, fromUsers.allUsersLoaded);

/**
 * Layout configurations selectors
 */
export const getSideNav = createSelector(getLayoutState, fromLayout.getSideNav);
export const getNavPosition = createSelector(getLayoutState, fromLayout.getNavPosition);
export const getDirection = createSelector(getLayoutState, fromLayout.getDirection);
export const getLayoutInTransition = createSelector(getLayoutState, fromLayout.getLayoutInTransition);
export const getIsMobile = createSelector(getLayoutState, fromLayout.getIsMobile);
export const getUseBreadcrumb = createSelector(getLayoutState, fromLayout.getUseBreadcrumb);
export const getBreadcrumb = createSelector(getLayoutState, fromLayout.getBreadcrumb);
export const getTopbarFixed = createSelector(getLayoutState, fromLayout.getTopbarFixed);








