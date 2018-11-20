import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import * as dashboardActions from '../../../state/dashboard.actions';
import * as fromDashboard from '../../../state/dashboard.reducer';

@Component({
  selector: 'moio-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'en';

  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Deutsche',
    code: 'de',
  }];
  public egretThemes;
  public sidebarStyle: string;

  constructor(
    private store: Store<fromDashboard.State>,
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;

    this.translate.use(this.currentLang);

    // TODO: Unsubscribe
    this.store.pipe(select(fromDashboard.getSideNav)).subscribe(
      sidebarStyle => this.sidebarStyle = sidebarStyle
    );
  }

  setLang(event) {
    // TODO: change language
    console.log(event);
    this.translate.use(this.currentLang);
  }

  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.sidebarStyle === 'closed') {
      this.store.dispatch(new dashboardActions.OpenSideNav('full'));
    } else {
      this.store.dispatch(new dashboardActions.CloseSideNav('closed'));
    }
  }

  toggleCollapse() {
    // compact --> full
    if (this.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true});
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true});

  }
}
