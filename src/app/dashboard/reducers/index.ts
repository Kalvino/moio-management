import * as fromUserPage from './users-page.reducer';
import * as fromRoot from '../../reducers';
import * as fromUsers from './users.reducer';
import * as fromLayout from './layout.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose dashboard state for global store
 */
export interface DashboardState {
  userPage: fromUserPage.State;
  users: fromUsers.State;
  layout: fromLayout.State;
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
export const reducers: ActionReducerMap<DashboardState, any> = {
  userPage: fromUserPage.reducer,
  users: fromUsers.reducer,
  layout: fromLayout.reducer
};

// create feature selectors
export const getDashboardState = createFeatureSelector<State, DashboardState>('dashboard');

// ****************** USERS PAGE *************
export const getUsersPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.userPage
);

export const getUserPageError = createSelector(
  getUsersPageState,
  fromUserPage.getError
);

export const getUserPagePending = createSelector(
  getUsersPageState,
  fromUserPage.getPending
);

// ****************** USERS *************
export const getUsersState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.users
);

// get the selected user id from state
export const getSelectedUserId = createSelector(
  getUsersState,
  fromUsers.getSelectedUserId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getUsersIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers
} = fromUsers.adapater.getSelectors(getUsersState);

// get the selected user from the state / users collection
export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, id) => entities[id]
);

// ****************** DASHBOARD LAYOUT *************
export const getLayoutState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.layout
);

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
