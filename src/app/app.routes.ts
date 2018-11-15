import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/containers/auth-layout.component';
import { ErrorLayoutComponent } from './errors/containers/error-layout.component';
import { DashboardLayoutComponent } from './dashboard/containers/dashboard-layout.component';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo : 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
        data: {title: 'Authentication'}
      }
    ]
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      {
        path: 'errors',
        loadChildren: './errors/errors.module#ErrorsModule',
        data: {title: 'Error'}
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {title: 'Dashboard'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'errors/404'
  }
];
