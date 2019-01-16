import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { TranslateService } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../reducers';
import { MaterialModule } from 'src/app/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';


describe('DashboardLayoutComponent', () => {

  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async(() => {

    const testBed = TestBed.configureTestingModule({
      declarations: [
        DashboardLayoutComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        PerfectScrollbarModule
      ],
      providers: [
        TranslateService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
