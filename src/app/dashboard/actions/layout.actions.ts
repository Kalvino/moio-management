import { Action } from '@ngrx/store';

/**
 * layout action types
 */
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

/**
 * open side navigation action
 */
export class OpenSideNav {
  readonly type = LayoutActionTypes.OpenSideNav;
  constructor(public payload: string) {
  }
}

/**
 * close side navigation action
 */
export class CloseSideNav {
  readonly type = LayoutActionTypes.CloseSideNav;
  constructor(public payload: string) {
  }
}

/**
 * compact side navigation action
 */
export class CompactSideNav {
  readonly type = LayoutActionTypes.CompactSideNav;
  constructor(public payload: string) { 
  }
}

/**
 * set navigation position to side action
 */
export class SetNavigationPositionSide {
  readonly type = LayoutActionTypes.SetNavigationPositionSide;
  constructor(public payload: string) { 
  }
}

/**
 * set navigation position to top action
 */
export class SetNavigationPositionTop {
  readonly type = LayoutActionTypes.SetNavigationPositionTop;
  constructor(public payload: string) { 
  }
}

/**
 * set direction to left-to-right action
 */
export class SetDirectionLtr {
  readonly type = LayoutActionTypes.SetDirectionLtr;
  constructor(public payload: string) { 
  }
}

/**
 * set direction to right-to-left action
 */
export class SetDirectionRtr {
  readonly type = LayoutActionTypes.SetDirectionRtr;
  constructor(public payload: string) { 
  }
}

/**
 * transition layout action
 */
export class TransitioningLayout {
  readonly type = LayoutActionTypes.TransitioningLayout;
  constructor(public payload: boolean) { 
  }
}

/**
 * Use breadcrumb action
 */
export class UseBreadcrumb {
  readonly type = LayoutActionTypes.UseBreadcrumb;
  constructor(public payload: boolean) { 
  }
}

/**
 * make breadcrumb simple action
 */
export class MakeBreadcrumbSimple {
  readonly type = LayoutActionTypes.MakeBreadcrumbSimple;
  constructor(public payload: string) { 
  }
}

/**
 * make breadcrum title action
 */
export class MakeBreadcrumbTitle {
  readonly type = LayoutActionTypes.MakeBreadcrumbTitle;
  constructor(public payload: string) { 
  }
}

/**
 * fix top bar action
 */
export class FixTopbar {
  readonly type = LayoutActionTypes.FixTopbar;
  constructor(public payload: boolean) { 
  }
}

export type LayoutActions = 
  | OpenSideNav
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
