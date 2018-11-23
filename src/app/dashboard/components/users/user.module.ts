import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEffects } from '../../effects/users.effects';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { usersReducer } from '../../reducers/users.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
  ]
})
export class UserModule { }
