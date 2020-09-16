import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * confirm component
 * used by confirm service
 */
@Component({
  selector: 'moio-confirm',
  templateUrl: './confirm.component.html'
})

/**
 * constructor
 * @param dialogRef Material Dialog Reference
 * @param data repres. an InjectionToken to access the data in the dialog
 */
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService
  ) {
  }
}
