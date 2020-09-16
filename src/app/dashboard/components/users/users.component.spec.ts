import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import { metaReducers, reducers } from '../../../reducers';
import * as fromDashboard from '../../reducers';
import { MaterialModule } from 'src/app/material';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        UserListComponent
      ],
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        MaterialModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers),
        StoreModule.forFeature('dashboard', fromDashboard.reducers),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
