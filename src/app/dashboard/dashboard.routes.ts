import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { BlankComponent } from './components/blank/blank.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AuthGuard } from '../auth/guards/auth.guard';

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
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'App Users List',
          breadcrumb: 'users-list'
        }
      }
    ]
  }
];
