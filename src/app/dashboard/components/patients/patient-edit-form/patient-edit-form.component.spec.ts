import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditFormComponent } from './patient-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as fromDashboard from '../../../reducers';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';

describe('PatientEditFormComponent', () => {
  let component: PatientEditFormComponent;
  let fixture: ComponentFixture<PatientEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PatientEditFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NgxDatatableModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers),
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
