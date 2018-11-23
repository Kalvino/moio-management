import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  sideNavStyle: string; // full, compact, closed
  navigationPos: string;   // side, top
  direction: string;             // ltr, rtl
  layoutInTransition: boolean;
  isMobile: boolean;
  useBreadcrumb: boolean;
  breadcrumb: string;      // simple, title
  topbarFixed: boolean;
}

const initialState: State = {
  sideNavStyle: 'full',
  navigationPos: 'side',
  direction: 'ltr',
  layoutInTransition: false,
  isMobile: false,
  useBreadcrumb: true,
  breadcrumb: 'title',
  topbarFixed: false
};

export const getDashboardState = createFeatureSelector<State>('dashboard');

export const getSideNav = createSelector(
  getDashboardState,
  (state: State) => state.sideNavStyle
);
export const getNavPosition = createSelector(
  getDashboardState,
  (state: State) => state.navigationPos
);
export const getDirection = createSelector(
  getDashboardState,
  (state: State) => state.direction
);
export const getLayoutInTransition = createSelector(
  getDashboardState,
  (state: State) => state.layoutInTransition
);
export const getIsMobile = createSelector(
  getDashboardState,
  (state: State) => state.isMobile
);
export const getUseBreadcrumb = createSelector(
  getDashboardState,
  (state: State) => state.useBreadcrumb
);
export const getBreadcrumb = createSelector(
  getDashboardState,
  (state: State) => state.breadcrumb
);
export const getTopbarFixed = createSelector(
  getDashboardState,
  (state: State) => state.topbarFixed
);

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {

    case LayoutActionTypes.OpenSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };
    case LayoutActionTypes.CloseSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };
    case LayoutActionTypes.CompactSideNav:
      return {
        ...state,
        sideNavStyle: action.payload
      };

    case LayoutActionTypes.SetNavigationPositionSide:
      return {
        ...state,
        navigationPos: action.payload
      };
    case LayoutActionTypes.SetNavigationPositionTop:
      return {
        ...state,
        navigationPos: action.payload
      };

    case LayoutActionTypes.SetDirectionLtr:
      return {
        ...state,
        direction: action.payload
      };
    case LayoutActionTypes.SetDirectionRtr:
      return {
        ...state,
        direction: action.payload
      };

    case LayoutActionTypes.TransitioningLayout:
      return {
        ...state,
        layoutInTransition: action.payload
      };

    case LayoutActionTypes.UseBreadcrumb:
      return {
        ...state,
        useBreadcrumb: action.payload
      };

    case LayoutActionTypes.MakeBreadcrumbSimple:
      return {
        ...state,
        breadcrumb: action.payload
      };

    case LayoutActionTypes.MakeBreadcrumbTitle:
      return {
        ...state,
        breadcrumb: action.payload
      };

    case LayoutActionTypes.FixTopbar:
      return {
        ...state,
        topbarFixed: action.payload
      };

    default:
      return state;
  }
}
