import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSideNav = '[Layout] Open Side Nav',
  CloseSideNav = '[Layout] Close Side Nav',
  CompactSideNav = '[Layout] Compact Nav position',
  SetNavigationPositionSide = '[Layout] Set Navigation Position Side',
  SetNavigationPositionTop = '[Layout] Set Navigation Position Top',
  SetDirectionLtr = '[Layout] Set Direction Ltr',
  SetDirectionRtr = '[Layout] Set Direction Rtr',
  TransitioningLayout = '[Layout] Transitioning Layout',
  UseBreadcrumb = '[Layout] Use Breadcrumb',
  MakeBreadcrumbSimple = '[Layout] Make Breadcrumb Simple',
  MakeBreadcrumbTitle = '[Layout] Make Breadcrumb Title',
  FixTopbar = '[Layout] Fix Topbar'
}

export class OpenSideNav {
  readonly type = LayoutActionTypes.OpenSideNav;
  constructor(public payload: string) { }
}
export class CloseSideNav {
  readonly type = LayoutActionTypes.CloseSideNav;
  constructor(public payload: string) { }
}
export class CompactSideNav {
  readonly type = LayoutActionTypes.CompactSideNav;
  constructor(public payload: string) { }
}
export class SetNavigationPositionSide {
  readonly type = LayoutActionTypes.SetNavigationPositionSide;
  constructor(public payload: string) { }
}
export class SetNavigationPositionTop {
  readonly type = LayoutActionTypes.SetNavigationPositionTop;
  constructor(public payload: string) { }
}
export class SetDirectionLtr {
  readonly type = LayoutActionTypes.SetDirectionLtr;
  constructor(public payload: string) { }
}
export class SetDirectionRtr {
  readonly type = LayoutActionTypes.SetDirectionRtr;
  constructor(public payload: string) { }
}
export class TransitioningLayout {
  readonly type = LayoutActionTypes.TransitioningLayout;
  constructor(public payload: boolean) { }
}
export class UseBreadcrumb {
  readonly type = LayoutActionTypes.UseBreadcrumb;
  constructor(public payload: boolean) { }
}
export class MakeBreadcrumbSimple {
  readonly type = LayoutActionTypes.MakeBreadcrumbSimple;
  constructor(public payload: string) { }
}
export class MakeBreadcrumbTitle {
  readonly type = LayoutActionTypes.MakeBreadcrumbTitle;
  constructor(public payload: string) { }
}
export class FixTopbar {
  readonly type = LayoutActionTypes.FixTopbar;
  constructor(public payload: boolean) { }
}

export type LayoutActions = OpenSideNav
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
