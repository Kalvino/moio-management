import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorLayoutComponent } from './containers/error-layout.component';

export const errorsRoutes: Routes = [
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
        data: {title: 'Not Found'}
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: {title: 'Error'}
      }
    ]
  }
];
