import * as fromUserPage from './users-page.reducer';
import * as fromReportPage from './reports-page.reducer';
import * as fromPatientPage from './patients-page.reducer';
import * as fromNursingHomePage from './nursing-homes-page.reducer';
import * as fromRoot from '../../reducers';
import * as fromUsers from './users.reducer';
import * as fromReports from './reports.reducer';
import * as fromPatients from './patients.reducer';
import * as fromUserPatients from './user-patients.reducer';
import * as fromPatientUsers from './patient-users.reducer';
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
  patientPage: fromPatientPage.State;
  patients: fromPatients.State;
  userPatients: fromUserPatients.State;
  patientUsers: fromPatientUsers.State;
  layout: fromLayout.State;
  reportPage: fromReportPage.State;
  reports: fromReports.State;
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
  patientPage: fromPatientPage.reducer,
  patients: fromPatients.reducer,
  userPatients: fromUserPatients.reducer,
  patientUsers: fromPatientUsers.reducer,
  layout: fromLayout.reducer,
  reportPage: fromReportPage.reducer,
  reports: fromReports.reducer
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

// get pending state when loading user patients from the store
export const getLoadUserPatientsPending = createSelector(
  getUsersPageState,
  fromUserPage.getLoadUserPatientsPending
);

// get error state when loading user patients from the store
export const getLoadUserPatientsError = createSelector(
  getUsersPageState,
  fromUserPage.getLoadUserPatientsError
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


// ****************** USER PATIENTS *************
export const getUserPatientsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.userPatients
);

// deconstruct several functions from ngrx/entity
export const {
  selectEntities: getUserPatientsEntities,
  selectAll: getAllUserPatients,
  selectTotal: getTotalUserPatients
} = fromUserPatients.adapater.getSelectors(getUserPatientsState);



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

// ****************** PATIENTS PAGE *************
export const getPatientsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.patientPage
);

// get error state of the patientPage from the store
export const getPatientPageError = createSelector(
  getPatientsPageState,
  fromPatientPage.getError
);

// get pending state of the patientPage from the store
export const getPatientPagePending = createSelector(
  getPatientsPageState,
  fromPatientPage.getPending
);

// get error state when creating patient from the store
export const getPatientCreationError = createSelector(
  getPatientsPageState,
  fromPatientPage.getCreatePatientError
);

// get pending state when creating a patient from the store
export const getPatientCreationPending = createSelector(
  getPatientsPageState,
  fromPatientPage.getCreatePatientPending
);

// get error state when editing a patient from the store
export const getPatientEditionError = createSelector(
  getPatientsPageState,
  fromPatientPage.getEditPatientError
);

// get pending state when editing a patient from the store
export const getPatientEditionPending = createSelector(
  getPatientsPageState,
  fromPatientPage.getEditPatientPending
);

// get pending state when loading patient users from the store
export const getLoadPatientUsersPending = createSelector(
  getPatientsPageState,
  fromPatientPage.getLoadPatientUsersPending
);

// get error state when loading patient users from the store
export const getLoadPatientUsersError = createSelector(
  getPatientsPageState,
  fromPatientPage.getLoadPatientUsersError
);

// ****************** PATIENTS *************
export const getPatientsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.patients
);

// get the selected patient id from state
export const getSelectedPatientId = createSelector(
  getPatientsState,
  fromPatients.getSelectedPatientId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getPatientsIds,
  selectEntities: getPatientEntities,
  selectAll: getAllPatients,
  selectTotal: getTotalPatients
} = fromPatients.adapater.getSelectors(getPatientsState);

// get the selected patient from the state / patients collection
export const getSelectedPatient = createSelector(
  getPatientEntities,
  getSelectedPatientId,
  (entities, id) => entities[id]
);

// ****************** PATIENT USERS *************
export const getPatientUsersState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.patientUsers
);

// deconstruct several functions from ngrx/entity
export const {
  selectEntities: getPatientUsersEntities,
  selectAll: getAllPatientUsers,
  selectTotal: getTotalPatientUsers
} = fromPatientUsers.adapater.getSelectors(getPatientUsersState);

// ****************** DASHBOARD LAYOUT *************
export const getLayoutState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.layout
);


// ****************** REPORTS PAGE *************
export const getReportsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.reportPage
);

// get error state of the reportPage from the store
export const getReportPageError = createSelector(
  getReportsPageState,
  fromReportPage.getError
);

// get pending state of the reportPage from the store
export const getReportPagePending = createSelector(
  getReportsPageState,
  fromReportPage.getPending
);

// get error state when creating report from the store
export const getReportCreationError = createSelector(
  getReportsPageState,
  fromReportPage.getCreateReportError
);

// get pending state when creating a report from the store
export const getReportCreationPending = createSelector(
  getReportsPageState,
  fromReportPage.getCreateReportPending
);

// get error state when editing a report from the store
export const getReportEditionError = createSelector(
  getReportsPageState,
  fromReportPage.getEditReportError
);

// get pending state when editing a report from the store
export const getReportEditionPending = createSelector(
  getReportsPageState,
  fromReportPage.getEditReportPending
);

// get pending state when loading report patients from the store
export const getLoadReportPatientsPending = createSelector(
  getReportsPageState,
  fromReportPage.getLoadReportPatientsPending
);

// get error state when loading report patients from the store
export const getLoadReportPatientsError = createSelector(
  getReportsPageState,
  fromReportPage.getLoadReportPatientsError
);

// ****************** REPORTS *************
export const getReportsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.reports
);

// get the selected report id from state
export const getSelectedReportId = createSelector(
  getReportsState,
  fromReports.getSelectedReportId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getReportsIds,
  selectEntities: getReportEntities,
  selectAll: getAllReports,
  selectTotal: getTotalReports
} = fromReports.adapater.getSelectors(getReportsState);

// get the selected report from the state / reports collection
export const getSelectedReport = createSelector(
  getReportEntities,
  getSelectedReportId,
  (entities, id) => entities[id]
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
