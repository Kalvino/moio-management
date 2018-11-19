import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NotificationsComponent } from './containers/layout-components/notifications/notifications.component';
import { BreadcrumbComponent } from './containers/layout-components/breadcrumb/breadcrumb.component';
import { HeaderSideComponent } from './containers/layout-components/header-side/header-side.component';
import { SidebarSideComponent } from './containers/layout-components/sidebar-side/sidebar-side.component';
import { SidebarTopComponent } from './containers/layout-components/sidebar-top/sidebar-top.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { SidenavComponent } from './containers/layout-components/sidenav/sidenav.component';
import { BlankComponent } from './components/blank/blank.component';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/dashboard.reducer';

export const COMPONENTS = [
  DashboardLayoutComponent,
  NotificationsComponent,
  BreadcrumbComponent,
  HeaderSideComponent,
  NotificationsComponent,
  SidebarSideComponent,
  SidebarTopComponent,
  SidenavComponent,
  BlankComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    DashboardRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dashboard', reducer)
  ]
})
export class DashboardModule {
}
