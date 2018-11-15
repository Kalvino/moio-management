import { Routes } from '@angular/router';
import { TestComponent } from './components/test.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
        component: TestComponent
      }
    ]
  }
];
