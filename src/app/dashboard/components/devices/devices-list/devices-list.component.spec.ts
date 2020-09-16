import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesListComponent } from './devices-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as fromDashboard from '../../../reducers';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';

describe('DeviceListComponent', () => {
  let component: DevicesListComponent;
  let fixture: ComponentFixture<DevicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DevicesListComponent
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
    fixture = TestBed.createComponent(DevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
