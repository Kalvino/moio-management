import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslateService } from '@ngx-translate/core';

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
  public layoutConf: any;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang);
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
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
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
