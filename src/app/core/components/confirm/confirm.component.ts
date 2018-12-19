import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * confirm component
 * used by confirm service
 */
@Component({
  selector: 'moio-confirm',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
  <div mat-dialog-content>{{ data.message }}</div>
  <div mat-dialog-actions>
    <button
      type="button"
      mat-raised-button
      color="primary"
      (click)="dialogRef.close(true)"> {{'Ok' }}
    </button>
    &nbsp;
    <span fxFlex></span>
    <button
      type="button"
      color="accent"
      mat-raised-button
      (click)="dialogRef.close(false)">{{'Cancel' }}
    </button>
  </div>`
})

/**
 * constructor
 * @param dialogRef Material Dialog Reference
 * @param data repres. an InjectionToken to access the data in the dialog
 */
export class ConfirmComponent {
  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}
