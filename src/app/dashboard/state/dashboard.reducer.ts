import * as fromAuth from '../../auth/reducers/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions';

export interface State extends fromAuth.State {
  dashboard: DashboardState;
}

export interface DashboardState {
  showSideNav: string;
}

const initialState: DashboardState = {
  showSideNav: 'full'
};

const getDashboardFeatureState = createFeatureSelector<DashboardState>('dashboard');

export const getShowSideNav = createSelector(
  getDashboardFeatureState,
  state => state.showSideNav
);

export function reducer(state = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {

    case DashboardActionTypes.OpenSideNav:
      return {
        ...state,
        showSideNav: action.payload
      };

    case DashboardActionTypes.CloseSideNav:
      return {
        ...state,
        showSideNav: action.payload
      };

    default:
      return state;
  }
}
