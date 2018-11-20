import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  OpenSideNav = '[Dashboard] Open Side Nav',
  CloseSideNav = '[Dashboard] Close Side Nav',
  CompactSideNav = '[Dashboard] Compact Nav position',
  SetNavigationPositionSide = '[Dashboard] Set Navigation Position Side',
  SetNavigationPositionTop = '[Dashboard] Set Navigation Position Top',
  SetDirectionLtr = '[Dashboard] Set Direction Ltr',
  SetDirectionRtr = '[Dashboard] Set Direction Rtr',
  TransitioningLayout = '[Dashboard] Transitioning Layout',
  UseBreadcrumb = '[Dashboard] Use Breadcrumb',
  MakeBreadcrumbSimple = '[Dashboard] Make Breadcrumb Simple',
  MakeBreadcrumbTitle = '[Dashboard] Make Breadcrumb Title',
  FixTopbar = '[Dashboard] Fix Topbar'
}

export class OpenSideNav {
  readonly type = DashboardActionTypes.OpenSideNav;
  constructor(public payload: string) { }
}
export class CloseSideNav {
  readonly type = DashboardActionTypes.CloseSideNav;
  constructor(public payload: string) { }
}
export class CompactSideNav {
  readonly type = DashboardActionTypes.CompactSideNav;
  constructor(public payload: string) { }
}
export class SetNavigationPositionSide {
  readonly type = DashboardActionTypes.SetNavigationPositionSide;
  constructor(public payload: string) { }
}
export class SetNavigationPositionTop {
  readonly type = DashboardActionTypes.SetNavigationPositionTop;
  constructor(public payload: string) { }
}
export class SetDirectionLtr {
  readonly type = DashboardActionTypes.SetDirectionLtr;
  constructor(public payload: string) { }
}
export class SetDirectionRtr {
  readonly type = DashboardActionTypes.SetDirectionRtr;
  constructor(public payload: string) { }
}
export class TransitioningLayout {
  readonly type = DashboardActionTypes.TransitioningLayout;
  constructor(public payload: boolean) { }
}
export class UseBreadcrumb {
  readonly type = DashboardActionTypes.UseBreadcrumb;
  constructor(public payload: boolean) { }
}
export class MakeBreadcrumbSimple {
  readonly type = DashboardActionTypes.MakeBreadcrumbSimple;
  constructor(public payload: string) { }
}
export class MakeBreadcrumbTitle {
  readonly type = DashboardActionTypes.MakeBreadcrumbTitle;
  constructor(public payload: string) { }
}
export class FixTopbar {
  readonly type = DashboardActionTypes.FixTopbar;
  constructor(public payload: boolean) { }
}

export type DashboardActions = OpenSideNav
                             | CloseSideNav
                             | CompactSideNav
                             | SetNavigationPositionSide
                             | SetNavigationPositionTop
                             | SetDirectionLtr
                             | SetDirectionRtr
                             | TransitioningLayout
                             | UseBreadcrumb
                             | MakeBreadcrumbSimple
                             | MakeBreadcrumbTitle
                             | FixTopbar;
