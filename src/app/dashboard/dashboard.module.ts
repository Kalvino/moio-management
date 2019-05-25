import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { NgModule } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
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
import { UsersEffects } from './effects/users.effects';
import { PatientsEffects } from './effects/patients.effects';
import { NursingHomesEffects } from './effects/nursing-homes.effects';
import { ConfirmService } from '../core/services/confirm.service';
import { NotifyService } from '../core/services/notify.service';
import { SharedModule } from './shared/shared.module';
import { MapIntersections } from './shared/gmap-intersection';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {CoreModule} from '../core/core.module';
import {UserListComponent} from './components/users/user-list/user-list.component';
import {PatientListComponent} from './components/patients/patient-list/patient-list.component';
import {UsersComponent} from './components/users/users.component';
import {ReportsComponent} from './components/reports/reports.component';
import {ReportListComponent} from './components/reports/reports-list/report-list.component';
import { ReportDetailsComponent } from './components/reports/report-details/report-details.component';
import {PatientsComponent} from './components/patients/patients.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SplitPaneModule} from 'ng2-split-pane/lib/ng2-split-pane';
import {UserEditFormComponent} from './components/users/user-edit-form/user-edit-form.component';
import {PatientEditFormComponent} from './components/patients/patient-edit-form/patient-edit-form.component';
import {UserFormComponent} from './components/users/user-form/user-form.component';
import {PatientFormComponent} from './components/patients/patient-form/patient-form.component';
import {NursingHomeFormComponent} from './components/nursing-homes/nursing-home-form/nursing-home-form.component';
import {LoaderComponent} from '../core/components/loader/loader.component';
import {AppDropdownDirective} from '../core/directives/dropdown.directive';
import {DropdownLinkDirective} from '../core/directives/dropdown-link.directive';
import {DropdownAnchorDirective} from '../core/directives/dropdown-anchor.directive';
import {EgretSideNavToggleDirective} from '../core/directives/egret-side-nav-toggle.directive';
import {FontSizeDirective} from '../core/directives/font-size.directive';
import {ScrollToDirective} from '../core/directives/scroll-to.directive';
import { ReportsEffects } from './effects/scm-reports.effects';

import { NursingHomeListComponent } from './components/nursing-homes/nursing-home-list/nursing-home-list.component';
import { NursingHomeEditFormComponent } from './components/nursing-homes/nursing-home-edit-form/nursing-home-edit-form.component';
import { NursingHomeGeofence } from './components/nursing-homes/geofence/geofence.component';
import { GeofenceFormComponent } from './components/nursing-homes/geofence-form/geofence-form.component';
import { GeofenceEditFormComponent } from './components/nursing-homes/geofence-edit-form/geofence-edit-form.component';
import { NursingHomeComponent } from './components/nursing-homes/nursing-home.component';


/**
 * list of components in this module
 */
export const COMPONENTS = [
    DashboardLayoutComponent,
    NotificationsComponent,
    BreadcrumbComponent,
    HeaderSideComponent,
    NotificationsComponent,
    SidebarSideComponent,
    SidebarTopComponent,
    SidenavComponent,
    BlankComponent,
    UsersComponent,
    ReportsComponent,
    ReportListComponent,
    ReportDetailsComponent,
    PatientsComponent,
    UserListComponent,
    PatientListComponent,
    UserEditFormComponent,
    PatientEditFormComponent,
    UserFormComponent,
    PatientFormComponent,
    NursingHomeFormComponent,
    NursingHomeListComponent,
    NursingHomeEditFormComponent,
    NursingHomeComponent,
    NursingHomeGeofence,
    GeofenceFormComponent,
    GeofenceEditFormComponent,

    LoaderComponent,
    AppDropdownDirective,
    DropdownLinkDirective,
    DropdownAnchorDirective,
    EgretSideNavToggleDirective,
    FontSizeDirective,
    ScrollToDirective

];

/**
 * list of effects in this module
 */
export const EFFECTS = [
    UsersEffects,
    PatientsEffects,
    NursingHomesEffects,
    ReportsEffects
];

/**
 * Dashboard Module
 */
@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        TranslateModule,
        DashboardRoutingModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxDatatableModule,
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
        EffectsModule.forFeature(EFFECTS),
        SplitPaneModule,
        AgmCoreModule.forRoot({
            libraries: ["places", "drawing"],
            apiKey: 'AIzaSyA8iBX6-mnmMBfh9dM1bXiFxdnnsx98qk4'
        })
    ],
    exports: [
        DashboardLayoutComponent,
        DashboardRoutingModule
    ],
    providers: [
        ConfirmService, NotifyService, GoogleMapsAPIWrapper, MapIntersections,
    ],
    entryComponents: [UserFormComponent, PatientFormComponent, NursingHomeFormComponent, GeofenceFormComponent, GeofenceEditFormComponent
    ]
})
export class DashboardModule {
}
