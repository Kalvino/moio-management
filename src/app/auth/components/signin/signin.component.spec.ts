import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import {reducers, metaReducers} from '../../../reducers';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SigninComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
