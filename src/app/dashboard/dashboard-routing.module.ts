import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { BlankComponent } from './components/blank/blank.component';
import { UsersComponent } from './components/users/users.component';
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
      }
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
