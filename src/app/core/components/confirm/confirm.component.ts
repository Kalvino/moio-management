import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'moio-confirm',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
  <div mat-dialog-content>{{ data.message }}</div>
  <div mat-dialog-actions>
    <button
      type="button"
      mat-raised-button
      color="primary"
      (click)="dialogRef.close(true)">{{'Ok' | translate}}
    </button>
    &nbsp;
    <span fxFlex></span>
    <button
      type="button"
      color="accent"
      mat-raised-button
      (click)="dialogRef.close(false)">{{'Cancel' | translate}}
    </button>
  </div>`
})
export class ComfirmComponent {
  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}
