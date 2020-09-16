import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingHomeEditFormComponent } from './nursing-home-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as fromDashboard from '../../../reducers';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';

describe('NursingHomeEditFormComponent', () => {
  let component: NursingHomeEditFormComponent;
  let fixture: ComponentFixture<NursingHomeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NursingHomeEditFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NgxDatatableModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forFeature('auth', fromAuth.reducers),
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursingHomeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
