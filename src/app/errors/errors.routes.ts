import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';

export const errorsRoutes: Routes = [
  {
    path: '',
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
