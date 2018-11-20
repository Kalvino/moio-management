import * as fromAuth from '../../auth/reducers/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import { Title } from '@angular/platform-browser';

export interface State extends fromAuth.State {
  dashboard: DashboardState;
}

export interface DashboardState {
  sideNavStyle: string; // full, compact, closed
  navigationPos: string;   // side, top
  direction: string;             // ltr, rtl
  layoutInTransition: boolean;
  isMobile: boolean;
  useBreadcrumb: boolean;
  breadcrumb: string;      // simple, title
  topbarFixed: boolean;
}

const initialState: DashboardState = {
  sideNavStyle: 'full',
  navigationPos: 'side',
  direction: 'ltr',
  layoutInTransition: false,
  isMobile: false,
  useBreadcrumb: true,
  breadcrumb: 'title',
  topbarFixed: false
};

const getDashboardFeatureState = createFeatureSelector<DashboardState>('dashboard');

export const getSideNav = createSelector(
  getDashboardFeatureState,
  state => state.sideNavStyle
);
export const getNavPosition = createSelector(
  getDashboardFeatureState,
  state => state.navigationPos
);
export const getDirection = createSelector(
  getDashboardFeatureState,
  state => state.direction
);
export const getLayoutInTransition = createSelector(
  getDashboardFeatureState,
  state => state.layoutInTransition
);
export const getIsMobile = createSelector(
  getDashboardFeatureState,
  state => state.isMobile
);
export const getUseBreadcrumb = createSelector(
  getDashboardFeatureState,
  state => state.useBreadcrumb
);
export const getBreadcrumb = createSelector(
  getDashboardFeatureState,
  state => state.breadcrumb
);
export const getTopbarFixed = createSelector(
  getDashboardFeatureState,
  state => state.topbarFixed
);

export function reducer(state = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {

    case DashboardActionTypes.OpenSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };
    case DashboardActionTypes.CloseSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };
    case DashboardActionTypes.CompactSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };

    case DashboardActionTypes.SetNavigationPositionSide:
      return {
        ...state,
        navigationPos: action.payload
      };
    case DashboardActionTypes.SetNavigationPositionTop:
      return {
        ...state,
        navigationPos: action.payload
      };

    case DashboardActionTypes.SetDirectionLtr:
      return {
        ...state,
        direction: action.payload
      };
    case DashboardActionTypes.SetDirectionRtr:
      return {
        ...state,
        direction: action.payload
      };

    case DashboardActionTypes.TransitioningLayout:
      return {
        ...state,
        layoutInTransition: action.payload
      };

    case DashboardActionTypes.UseBreadcrumb:
      return {
        ...state,
        useBreadcrumb: action.payload
      };

    case DashboardActionTypes.MakeBreadcrumbSimple:
      return {
        ...state,
        breadcrumb: action.payload
      };

    case DashboardActionTypes.MakeBreadcrumbTitle:
      return {
        ...state,
        breadcrumb: action.payload
      };

    case DashboardActionTypes.FixTopbar:
      return {
        ...state,
        topbarFixed: action.payload
      };

    default:
      return state;
  }
}
