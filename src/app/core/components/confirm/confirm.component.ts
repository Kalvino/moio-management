import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'moio-confirm',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
  <div mat-dialog-content>{{ data.message }}</div>
  <div mat-dialog-actions>
    <button
      type="button"
      mat-raised-button
      color="primary"
      (click)="dialogRef.close(true)">OK
    </button>
    &nbsp;
    <span fxFlex></span>
    <button
      type="button"
      color="accent"
      mat-raised-button
      (click)="dialogRef.close(false)">Cancel
    </button>
  </div>`
})
export class ComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}