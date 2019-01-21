import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import { TranslateModule } from '@ngx-translate/core';
import { metaReducers, reducers } from '../../../../reducers';
import * as fromAuth from '../../../../auth/reducers';
import { ReactiveFormsModule } from '@angular/forms';

import { Component, NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MaterialModule } from 'src/app/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('UserFormComponent', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<TriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DialogTestModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}
      ]
    })

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(TriggerComponent);

}));

  it('should create', () => {
    expect(dialog).toBeTruthy();
  });

  it('shows patient form dialog', () => {
    const config = {
        data: { title: 'Create a user' },
        id: 'patientCreationForm'
    };

    dialog.open(UserFormComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h1 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    const form = overlayContainerElement.querySelector('form');
    // const div = overlayContainerElement.querySelector('.mat-dialog-content');

    expect(h1).toBeDefined;
    expect(form).toBeDefined;
    // expect(div.textContent).toBe('Are you sure you want to logout?');
  });

});

// Trigger component - is a workaround to trigger change detection
@Component({
  template: ''
})
class TriggerComponent {}

const TEST_DIRECTIVES = [
  UserFormComponent,
  TriggerComponent
];

@NgModule({
  imports: [
    MatDialogModule, 
    TranslateModule.forRoot(),
    NoopAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature('auth', fromAuth.reducers),
    StoreModule.forFeature('dashboard', fromDashboard.reducers),
    TranslateModule.forRoot()],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    UserFormComponent
  ],
})
class DialogTestModule { }
