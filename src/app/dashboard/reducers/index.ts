import * as fromUsersPage from './users-page.reducer';
import * as fromReportsPage from './reports-page.reducer';
import * as fromPatientsPage from './patients-page.reducer';
import * as fromNursingHomesPage from './nursing-homes-page.reducer';
import * as fromDevicesPage from './devices-page.reducer';
import * as fromDeviceReportsPage from './device-reports-page.reducer';
import * as fromRoot from '../../reducers';
import * as fromUsers from './users.reducer';
import * as fromReports from './reports.reducer';
import * as fromDevices from './devices.reducer';
import * as fromPatients from './patients.reducer';
import * as fromUserPatients from './user-patients.reducer';
import * as fromDeviceReports from './device-reports.reducer';
import * as fromNursingHomeGeofencing from './nursing-homes-geofencing.reducer';
import * as fromPatientUsers from './patient-users.reducer';
import * as fromNursingHome from './nursing-homes.reducer';
import * as fromDatalessCommands from './dataless-commands-reducer';
import * as fromParsedDeviceReportsPage from './parsed-device-reports-page.reducer';
import * as fromParsedDeviceReports from './parsed-device-reports.reducer';
import * as fromLayout from './layout.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * compose dashboard state for global store
 */
export interface DashboardState {
  usersPage: fromUsersPage.State;
  users: fromUsers.State;
  nursingHomesPage: fromNursingHomesPage.State;
  nursingHomes: fromNursingHome.State;
  patientsPage: fromPatientsPage.State;
  patients: fromPatients.State;
  userPatients: fromUserPatients.State;
  nursingHomeGeofencing: fromNursingHomeGeofencing.State;
  patientUsers: fromPatientUsers.State;
  layout: fromLayout.State;
  reportsPage: fromReportsPage.State;
  reports: fromReports.State;
  deviceReports: fromDeviceReports.State;
  deviceReportsPage: fromDeviceReportsPage.State;
  devices: fromDevices.State;
  devicesPage: fromDevicesPage.State;
  datalessCommands: fromDatalessCommands.State;
  parsedDeviceReports: fromParsedDeviceReports.State;
  parsedDeviceReportsPage: fromParsedDeviceReportsPage.State;
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
  usersPage: fromUsersPage.reducer,
  users: fromUsers.reducer,
  nursingHomesPage: fromNursingHomesPage.reducer,
  nursingHomes: fromNursingHome.reducer,
  patientsPage: fromPatientsPage.reducer,
  patients: fromPatients.reducer,
  userPatients: fromUserPatients.reducer,
  nursingHomeGeofencing: fromNursingHomeGeofencing.reducer,
  patientUsers: fromPatientUsers.reducer,
  layout: fromLayout.reducer,
  reportsPage: fromReportsPage.reducer,
  reports: fromReports.reducer,
  devicesPage: fromDevicesPage.reducer,
  devices: fromDevices.reducer,
  deviceReportsPage: fromDeviceReportsPage.reducer,
  deviceReports: fromDeviceReports.reducer,
  datalessCommands: fromDatalessCommands.reducer,
  parsedDeviceReports: fromParsedDeviceReports.reducer,
  parsedDeviceReportsPage: fromParsedDeviceReportsPage.reducer

};

// create feature selectors
export const getDashboardState = createFeatureSelector<State, DashboardState>('dashboard');

// ****************** USERS PAGE *************
export const getUsersPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.usersPage
);

// get error state of the usersPage from the store
export const getUserPageError = createSelector(
  getUsersPageState,
  fromUsersPage.getError
);

// get pending state of the usersPage from the store
export const getUserPagePending = createSelector(
  getUsersPageState,
  fromUsersPage.getPending
);

// get error state when creating user from the store
export const getUserCreationError = createSelector(
  getUsersPageState,
  fromUsersPage.getCreateUserError
);

// get pending state when creating a user from the store
export const getUserCreationPending = createSelector(
  getUsersPageState,
  fromUsersPage.getCreateUserPending
);

// get error state when editing a user from the store
export const getUserEditionError = createSelector(
  getUsersPageState,
  fromUsersPage.getEditUserError
);

// get pending state when editing a user from the store
export const getUserEditionPending = createSelector(
  getUsersPageState,
  fromUsersPage.getEditUserPending
);

// get pending state when loading user patients from the store
export const getLoadUserPatientsPending = createSelector(
  getUsersPageState,
  fromUsersPage.getLoadUserPatientsPending
);

// get error state when loading user patients from the store
export const getLoadUserPatientsError = createSelector(
  getUsersPageState,
  fromUsersPage.getLoadUserPatientsError
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
} = fromUsers.adapter.getSelectors(getUsersState);

// get the selected user from the state / users collection
export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, id) => entities[id]
);


// ****************** DEVICE COMMANDS *************
export const getDatalessDeviceCommandsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.datalessCommands
);

// get the fired dataless command id from state
export const getFiredDatalessCommandId = createSelector(
  getDatalessDeviceCommandsState,
  fromDatalessCommands.getFiredCommandId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getFiredCommandId,
  selectEntities: getDatalessCommandsEntities,
  selectAll: getAllDatalessCommands,
  selectTotal: getTotalDatalessCommands
} = fromDatalessCommands.adapter.getSelectors(getDatalessDeviceCommandsState);


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
} = fromUserPatients.adapter.getSelectors(getUserPatientsState);



// ****************** NURSINGHOMES GEOFENCING *************
export const getNursingHomeGeofencingState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.nursingHomeGeofencing
);

// deconstruct several functions from ngrx/entity
export const {
  selectEntities: getNursingHomeGeofencingEntities,
  selectAll: getAllNursingHomeGeofencing,
  selectTotal: getTotalNursingHomeGeofencing
} = fromNursingHomeGeofencing.adapter.getSelectors(getNursingHomeGeofencingState);

// ****************** NURSING HOMES PAGE *************
export const getNursingHomesPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.nursingHomesPage
);

// get error state of the nursingHomesPage from the store
export const getNursingHomePageError = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getError
);

// get pending state of the nursingHomesPage from the store
export const getNursingHomePagePending = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getPending
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

// get pending state when loading user patients from the store
export const getNursingHomeGeofencingPending = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getNursingHomeGeofencingPending
);

// get error state when loading user patients from the store
export const getNursingHomeGeofencingError = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getNursingHomeGeofencingError
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getNursingHomesIds,
  selectEntities: getNursingHomeEntities,
  selectAll: getAllNursingHomes,
  selectTotal: getTotalNursingHomes
} = fromNursingHome.adapter.getSelectors(getNursingHomesState);

// get the selected nursing home from the state / nursing homes collection
export const getSelectedNursingHome = createSelector(
  getNursingHomeEntities,
  getSelectedNursingHomeId,
  (entities, id) => entities[id]
);

// get error state when editing a patient from the store
export const getNursingHomeEditionError = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getEditNursingHomeError
);

// get pending state when editing a patient from the store
export const getNursingHomeEditionPending = createSelector(
  getNursingHomesPageState,
  fromNursingHomesPage.getEditNursingHomePending
);

// ****************** PATIENTS PAGE *************
export const getPatientsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.patientsPage
);

// get error state of the patientsPage from the store
export const getPatientPageError = createSelector(
  getPatientsPageState,
  fromPatientsPage.getError
);

// get pending state of the patientsPage from the store
export const getPatientPagePending = createSelector(
  getPatientsPageState,
  fromPatientsPage.getPending
);

// get error state when creating patient from the store
export const getPatientCreationError = createSelector(
  getPatientsPageState,
  fromPatientsPage.getCreatePatientError
);

// get pending state when creating a patient from the store
export const getPatientCreationPending = createSelector(
  getPatientsPageState,
  fromPatientsPage.getCreatePatientPending
);

// get error state when editing a patient from the store
export const getPatientEditionError = createSelector(
  getPatientsPageState,
  fromPatientsPage.getEditPatientError
);

// get pending state when editing a patient from the store
export const getPatientEditionPending = createSelector(
  getPatientsPageState,
  fromPatientsPage.getEditPatientPending
);

// get pending state when loading patient users from the store
export const getLoadPatientUsersPending = createSelector(
  getPatientsPageState,
  fromPatientsPage.getLoadPatientUsersPending
);

// get error state when loading patient users from the store
export const getLoadPatientUsersError = createSelector(
  getPatientsPageState,
  fromPatientsPage.getLoadPatientUsersError
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
} = fromPatients.adapter.getSelectors(getPatientsState);

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
} = fromPatientUsers.adapter.getSelectors(getPatientUsersState);

// ****************** DASHBOARD LAYOUT *************
export const getLayoutState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.layout
);


// ****************** DEVICES PAGE *************
export const getDevicesPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.devicesPage
);

// get error state of the devicesPage from the store
export const getDevicesPageError = createSelector(
  getDevicesPageState,
  fromDevicesPage.getError
);

// get pending state of the devicesPage from the store
export const getDevicesPagePending = createSelector(
  getDevicesPageState,
  fromDevicesPage.getPending
);

// get error state when creating device from the store
export const getDeviceCreationError = createSelector(
  getDevicesPageState,
  fromDevicesPage.getCreateDeviceError
);

// get pending state when creating a device from the store
export const getDeviceCreationPending = createSelector(
  getDevicesPageState,
  fromDevicesPage.getCreateDevicePending
);

// get error state when editing a device from the store
export const getDeviceEditionError = createSelector(
  getDevicesPageState,
  fromDevicesPage.getEditDeviceError
);

// get pending state when editing a device from the store
export const getDeviceEditionPending = createSelector(
  getDevicesPageState,
  fromDevicesPage.getEditDevicePending
);

// ****************** DEVICES *************
export const getDevicesState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.devices
);

// get the selected device id from state
export const getSelectedDeviceId = createSelector(
  getDevicesState,
  fromDevices.getSelectedDeviceId
);

// deconstruct several functions from ngrx/entity
export const {
  selectIds: getDevicesIds,
  selectEntities: getDeviceEntities,
  selectAll: getAllDevices,
  selectTotal: getTotalDevices
} = fromDevices.adapter.getSelectors(getDevicesState);

// get the selected device from the state / devices collection
export const getSelectedDevice = createSelector(
  getDeviceEntities,
  getSelectedDeviceId,
  (entities, id) => entities[id]
);



// ****************** REPORTS PAGE *************
export const getReportsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.reportsPage
);

// get error state of the reportsPage from the store
export const getReportPageError = createSelector(
  getReportsPageState,
  fromReportsPage.getError
);

// get pending state of the reportsPage from the store
export const getReportPagePending = createSelector(
  getReportsPageState,
  fromReportsPage.getPending
);

// get error state when creating report from the store
export const getReportCreationError = createSelector(
  getReportsPageState,
  fromReportsPage.getCreateReportError
);

// get pending state when creating a report from the store
export const getReportCreationPending = createSelector(
  getReportsPageState,
  fromReportsPage.getCreateReportPending
);

// get error state when editing a report from the store
export const getReportEditionError = createSelector(
  getReportsPageState,
  fromReportsPage.getEditReportError
);

// get pending state when editing a report from the store
export const getReportEditionPending = createSelector(
  getReportsPageState,
  fromReportsPage.getEditReportPending
);

// get pending state when loading report patients from the store
export const getLoadReportPatientsPending = createSelector(
  getReportsPageState,
  fromReportsPage.getLoadReportPatientsPending
);

// get error state when loading report patients from the store
export const getLoadReportPatientsError = createSelector(
  getReportsPageState,
  fromReportsPage.getLoadReportPatientsError
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



// ****************** DEVICE REPORTS PAGE *************
export const getDeviceReportsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.deviceReportsPage
);

// get error state of the deviceReportsPage from the store
export const getDeviceReportsPageError = createSelector(
  getDeviceReportsPageState,
  fromDeviceReportsPage.getLoadDeviceReportsError
);

// get pending state of the deviceReportsPage from the store
export const getDeviceReportsPagePending = createSelector(
  getDeviceReportsPageState,
  fromDeviceReportsPage.getLoadDeviceReportsPending
);


// ****************** DEVICE REPORTS *************
export const getDeviceReportsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.deviceReports
);

// deconstruct several functions from ngrx/entity
export const {
  selectEntities: getDeviceReportsEntities,
  selectAll: getAllDeviceReports,
  selectTotal: getTotalDeviceReports
} = fromDeviceReports.adapter.getSelectors(getDeviceReportsState);






// ****************** PARSED DEVICE REPORTS PAGE *************
export const getParsedDeviceReportsPageState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.parsedDeviceReportsPage
);

// get error state of the deviceReportsPage from the store
export const getParsedDeviceReportsPageError = createSelector(
  getParsedDeviceReportsPageState,
  fromParsedDeviceReportsPage.getLoadParsedDeviceReportsError
);

// get pending state of the deviceReportsPage from the store
export const getParsedDeviceReportsPagePending = createSelector(
  getParsedDeviceReportsPageState,
  fromParsedDeviceReportsPage.getLoadParsedDeviceReportsPending
);


// ****************** PARSED DEVICE REPORTS *************
export const getParsedDeviceReportsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.parsedDeviceReports
);

// deconstruct several functions from ngrx/entity
export const {
  selectEntities: getParsedDeviceReportsEntities,
  selectAll: getAllParsedDeviceReports,
  selectTotal: getTotalParsedDeviceReports
} = fromParsedDeviceReports.adapter.getSelectors(getParsedDeviceReportsState);


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
