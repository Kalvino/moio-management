import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as dashboardActions from '../../../state/dashboard.actions';
import * as fromDashboard from '../../../state/dashboard.reducer';
import * as fromAuth from '../../../../auth/reducers';

// import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'moio-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  // private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public user: any;
  public username: string;

  constructor(
    private store: Store<any>,
    private navService: NavigationService,
    public themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      // Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });

    // TODO: Unsubscribe
    this.store.pipe(select(fromAuth.getUser)).subscribe(
      user => {
        this.user = user;
        this.username = this.user.username;
      }
    );

    console.log(this.user);
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }

  ngOnDestroy() {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

}
