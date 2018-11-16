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
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { LogoutConfirmationDialogComponent } from './components/dialogs/logout-confirmation-dialog.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';

export const COMPONENTS = [
  AuthLayoutComponent,
  ForgotPasswordComponent,
  LockscreenComponent,
  SigninComponent,
  SignupComponent,
  LogoutConfirmationDialogComponent
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
    TranslateModule,
    HttpClientModule,
    StoreModule.forFeature('auth', fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  entryComponents: [LogoutConfirmationDialogComponent]
})
export class AuthModule {
}
