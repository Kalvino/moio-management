import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import {reducers, metaReducers} from '../../../reducers';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
