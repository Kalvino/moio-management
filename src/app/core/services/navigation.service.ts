import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string;       // Possible values: link/dropDown/icon/separator/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true; item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}

interface IChildItem {
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() {
  }

  iconMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard/blank'
    },
    {
      name: 'Users',
      type: 'link',
      tooltip: 'users',
      icon: 'group',
      state: 'dashboard/users'
    },
    {
      name: 'Patients',
      type: 'link',
      tooltip: 'patients',
      icon: 'accessible',
      state: 'dashboard/patients'
    },
    {
      name: 'Devices',
      type: 'link',
      tooltip: 'devices',
      icon: 'memory',
      state: 'dashboard/devices'
    },
    {
      name: 'NursingHomes',
      type: 'link',
      tooltip: 'nursing-homes',
      icon: 'domain',
      state: 'dashboard/nursing-homes'
    }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}
