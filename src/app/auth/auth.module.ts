import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LockscreenComponent } from './components/lockscreen/lockscreen.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthLayoutComponent } from './containers/auth-layout.component';

export const COMPONENTS = [
  AuthLayoutComponent,
  ForgotPasswordComponent,
  LockscreenComponent,
  SigninComponent,
  SignupComponent
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AuthModule {
}
