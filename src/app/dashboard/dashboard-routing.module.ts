import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { BlankComponent } from './components/blank/blank.component';
import { UsersComponent } from './components/users/users.component';
import { PatientsComponent } from './components/patients/patients.component';
import { NursingHomeComponent } from './components/nursing-homes/nursing-home.component';
import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';

/**
 * Dashboard module routings
 * protected by AuthGuard
**/
export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard',
      breadcrumb: 'Dashboard'
    },
    children: [
      {
        path: '',
        redirectTo: 'blank',
        pathMatch: 'full'
      },
      {
        path: 'blank',
        component: BlankComponent,
        data: {
          title: 'Blank',
          breadcrumb: 'Blank'
        }
      }, {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
          breadcrumb: 'Users'
        }
      }, {
        path: 'patients',
        component: PatientsComponent,
        data: {
          title: 'Patients',
          breadcrumb: 'Patients'
        }
      }, {
        path: 'devices',
        loadChildren: './devices/devices.module#DevicesModule'
      },
      {
        path: 'nursing-homes',
        component: NursingHomeComponent,
        data: {
          title: 'Nursing Homes',
          breadcrumb: 'NursingHome'
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
