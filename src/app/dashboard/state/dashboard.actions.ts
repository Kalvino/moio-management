import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  OpenSideNav = '[Dashboard] Open Side Nav',
  CloseSideNav = '[Dashboard] Close Side Nav'
}

export class OpenSideNav {
  readonly type = DashboardActionTypes.OpenSideNav;

  constructor(public payload: string) { }
}

export class CloseSideNav {
  readonly type = DashboardActionTypes.CloseSideNav;

  constructor(public payload: string) {}
}

export type DashboardActions = OpenSideNav
                             | CloseSideNav;
