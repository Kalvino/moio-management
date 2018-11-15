import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo : 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
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
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Dashboard',
          breadcrumb: 'Dashboard'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'errors/404'
  }
];
