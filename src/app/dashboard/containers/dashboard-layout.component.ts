import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { NavigationEnd, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { LayoutService } from '../../core/services/layout.service';
import { ObservableMedia } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromDashboard from '../reducers';
import * as layoutActions from '../actions/layout.actions';

@Component({
  selector: 'moio-dashboard',
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;
  private mediaSub: Subscription;
  // private sidebarPS: PerfectScrollbar;

  // private bodyPS: PerfectScrollbar;
  // private headerFixedBodyPS: PerfectScrollbar;
  public scrollConfig = {};
  public layoutConf: any = {};
  public sidebarStyle: string;
  public navPosition: string;
  public layoutInTransition: boolean;
  public topBarFixed: boolean;
  public getIsMobile: boolean;

  constructor(
    private store: Store<fromDashboard.State>,
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private media: ObservableMedia
  ) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((routeChange: NavigationEnd) => {
        this.layout.adjustLayout({route: routeChange.url});
      });

    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
  }

  ngOnInit() {
    this.store.pipe(select(fromDashboard.getSideNav)).subscribe(
      sideNavStyle => this.sidebarStyle = sideNavStyle
    );

    this.store.pipe(select(fromDashboard.getNavPosition)).subscribe(
      navPosition => this.navPosition = navPosition
    );

    this.store.pipe(select(fromDashboard.getLayoutInTransition)).subscribe(
      layoutInTransition => this.layoutInTransition = layoutInTransition
    );

    this.store.pipe(select(fromDashboard.getTopbarFixed)).subscribe(
      topBarFixed => this.topBarFixed = topBarFixed
    );

    this.store.pipe(select(fromDashboard.getIsMobile)).subscribe(
      isMobile => this.getIsMobile = isMobile
    );

    console.log(this.sidebarStyle);
    console.log(this.getIsMobile);

    this.layoutConf = this.layout.layoutConf;

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }

  ngAfterViewInit() {
    // this.layoutConfSub = this.layout-components.layoutConf$.subscribe(change => {
    //   // this.initBodyPS(change)
    // })
  }

  // initBodyPS(layoutConf:any = {}) {
  //   if(layoutConf.navigationPos === 'side' && layoutConf.topbarFixed) {
  //     if (this.bodyPS) this.bodyPS.destroy();
  //     if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
  //     this.headerFixedBodyPS = new PerfectScrollbar('.rightside-content-hold', {
  //       suppressScrollX: true
  //     });
  //     this.scrollToTop('.rightside-content-hold');
  //   } else {
  //     if (this.bodyPS) this.bodyPS.destroy();
  //     if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
  //     this.bodyPS = new PerfectScrollbar('.main-content-wrap', {
  //       suppressScrollX: true
  //     });
  //     this.scrollToTop('.main-content-wrap');
  //   }
  // }
  scrollToTop(selector: string) {
    if (document) {
      const element = <HTMLElement>document.querySelector(selector);
      element.scrollTop = 0;
    }
  }

  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  closeSidebar() {
    this.store.dispatch(new layoutActions.CloseSideNav('close'));
  }

}
