import * as fromUserPage from './users-page.reducer';
import * as fromNursingHomePage from './nursing-homes-page.reducer';
import * as fromRoot from '../../reducers';
import * as fromUsers from './users.reducer';
import * as fromNursingHome from './nursing-homes.reducer';
import * as fromLayout from './layout.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose dashboard state for global store
 */
export interface DashboardState {
  userPage: fromUserPage.State;
  users: fromUsers.State;
  nursingHomePage: fromNursingHomePage.State;
  nursingHomes: fromNursingHome.State;
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
  nursingHomePage: fromNursingHomePage.reducer,
  nursingHomes: fromNursingHome.reducer,
  layout: fromLayout.reducer
};

// create feature selectors
export const getDashboardState = createFeatureSelector<State, DashboardState>('dashboard');

// ****************** USERS PAGE *************
export const getUsersPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.userPage
);

// get error state of the userPage from the store
export const getUserPageError = createSelector(
  getUsersPageState,
  fromUserPage.getError
);

// get pending state of the userPage from the store
export const getUserPagePending = createSelector(
  getUsersPageState,
  fromUserPage.getPending
);

// get error state when creating user from the store
export const getUserCreationError = createSelector(
  getUsersPageState,
  fromUserPage.getCreateUserError
);

// get pending state when creating a user from the store
export const getUserCreationPending = createSelector(
  getUsersPageState,
  fromUserPage.getCreateUserPending
);

// get error state when editing a user from the store
export const getUserEditionError = createSelector(
  getUsersPageState,
  fromUserPage.getEditUserError
);

// get pending state when editing a user from the store
export const getUserEditionPending = createSelector(
  getUsersPageState,
  fromUserPage.getEditUserPending
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


// ****************** NURSING HOMES PAGE *************
export const getNursingHomesPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.nursingHomePage
);

// get error state of the nursingHomePage from the store
export const getNursingHomePageError = createSelector(
  getNursingHomesPageState,
  fromNursingHomePage.getError
);

// get pending state of the nursingHomePage from the store
export const getNursingHomePagePending = createSelector(
  getNursingHomesPageState,
  fromNursingHomePage.getPending
);

// ****************** NURSING HOMES *************
export const getNursingHomesState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.nursingHomes
);

// get the selected nursing home id from state
export const getSelectedNursingHomeId = createSelector(
  getNursingHomesState,
  fromNursingHome.getSelectedNursingHomeId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getNursingHomesIds,
  selectEntities: getNursingHomeEntities,
  selectAll: getAllNursingHomes,
  selectTotal: getTotalNursiomes
} = fromNursingHome.adapater.getSelectors(getNursingHomesState);

// get the selected nursing home from the state / nursing homes collection
export const getSelectedNursingHome = createSelector(
  getNursingHomeEntities,
  getSelectedNursingHomeId,
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
