import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: '**',
    redirectTo: 'errors/404',
    pathMatch: 'full'
  }
];