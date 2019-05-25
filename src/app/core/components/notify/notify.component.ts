import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * notify component
 * used by notify service
 */
@Component({
  selector: 'moio-notify',
  templateUrl: './notify.component.html'
})

/**
 * constructor
 * @param dialogRef Material Dialog Reference
 * @param data repres. an InjectionToken to access the data in the dialog
 */
export class NotifyComponent {
  constructor(
    public dialogRef: MatDialogRef<NotifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService
  ) {
  }
}
