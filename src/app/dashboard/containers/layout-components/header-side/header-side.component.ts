import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { AuthActions } from '../../../../auth/actions';
import * as layoutActions from '../../../actions/layout.actions';
import * as fromAuth from '../../../../auth/reducers';
import * as fromDashboard from '../../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'moio-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'de';

  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Deutsch',
    code: 'de',
  }];
  public egretThemes;
  public sidebarStyle: string;

  constructor(
    private authStore: Store<fromAuth.State>,
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
      (sidebarStyle:string) => this.sidebarStyle = sidebarStyle
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
    // todo subscribe to the sidenavstyle
    if (this.sidebarStyle === 'closed') {
      this.store.dispatch(new layoutActions.OpenSideNav('full'));
    } else {
      this.store.dispatch(new layoutActions.CloseSideNav('closed'));
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

  /**
   * logout the user
   */
  onConfirmLogout() {
    this.authStore.dispatch(new AuthActions.LogoutConfirmation());
  }
}
