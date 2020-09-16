import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { ConfirmComponent } from '../components/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * confirmation data for this service
 */
interface ConfirmData {
  title?: string;
  message?: string;
}

/**
 * Confirmation service
 * allows an easy interface to call a confirmation
 * dialog in the UI
 */
@Injectable({
  providedIn: 'root'
})

export class ConfirmService {

   /**
   * constructor
   * @param dialog material dialog reference
   * @param translate translate service
   */
  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
  }

  /**
   * confirm opens the dialog
   *
   * @param data ConfirmData composed from title and message
   * returns a dialog.afterClosed() Observable.
   * Subscribe to the returned reference to get true | false from
   * the clicked button
   * @return dialogRef MatDialogRef Observable
   */
  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || this.translate.instant('Confirm');;
    data.message = data.message || this.translate.instant('Are you sure?');;
    let dialogRef: MatDialogRef<ConfirmComponent>;
    dialogRef = this.dialog.open(ConfirmComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}
