import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LockscreenComponent } from './components/lockscreen/lockscreen.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        component: SignupComponent,
        data: {title: 'Signup'}
      }, {
        path: 'signin',
        component: SigninComponent,
        data: {title: 'Signin'}
      }, {
        path: 'forgot',
        component: ForgotPasswordComponent,
        data: {title: 'Forogot Password'}
      }, {
        path: 'lock',
        component: LockscreenComponent,
        data: {title: 'Lockscreen'}
      }
    ]
  }
];
