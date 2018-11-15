import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { BlankComponent } from './components/blank/blank.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'blank',
        component: BlankComponent,
        data: {
          title: 'Blank',
          breadcrumb: 'Blank'
        }
      }
    ]
  }
];
