import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NursingHomeComponent } from './nursing-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NursingHomeListComponent } from './nursing-home-list/nursing-home-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import { metaReducers, reducers } from '../../../reducers';
import * as fromDashboard from '../../reducers';
import { MaterialModule } from 'src/app/material';

describe('NursingHomeComponent', () => {
  let component: NursingHomeComponent;
  let fixture: ComponentFixture<NursingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NursingHomeComponent,
        NursingHomeListComponent
      ],
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        MaterialModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forFeature('auth', fromAuth.reducers),
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
