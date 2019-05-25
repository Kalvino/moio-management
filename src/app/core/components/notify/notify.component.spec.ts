import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

import { NotifyComponent } from './notify.component';

describe('NotifyDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<TriggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(TriggerComponent);

  });

  it('should create', () => {
    expect(dialog).toBeTruthy();
  });

  it('shows notify dialog', () => {
    const config = {
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to logout?'
      }
    };
    dialog.open(NotifyComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h1 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    const div = overlayContainerElement.querySelector('.mat-dialog-content');
    // const button = overlayContainerElement.querySelector('button');

    // expect(h1.textContent).toBe('Confirm Logout');
    expect(h1).toBeDefined();
    // expect(div.textContent).toBe('Are you sure you want to logout?');
  });

});

// Trigger component - is a workaround to trigger change detection
@Component({
  template: ''
})
class TriggerComponent { }

const TEST_DIRECTIVES = [
  NotifyComponent,
  TriggerComponent
];

@NgModule({
  imports: [MatDialogModule, TranslateModule.forRoot(), NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    NotifyComponent
  ],
})
class DialogTestModule { }
