import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthActions } from '../../../../auth/actions';
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

  constructor(
    private authStore: Store<fromAuth.State>,
    private store: Store<any>,
    private navService: NavigationService,
    public themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      console.log(this.menuItems);
      // Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });

    // TODO: Unsubscribe
    this.store.pipe(select(fromAuth.getUser)).subscribe(
      user => this.user = user );

    console.log(this.user);


  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }

  /**
   * logout the user
   */
  onConfirmLogout() {
    this.authStore.dispatch(new AuthActions.LogoutConfirmation());
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
