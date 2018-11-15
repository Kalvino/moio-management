import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { ComfirmComponent } from '../components/confirm/confirm.component';

interface ConfirmData {
  title?: string;
  message?: string;
}

@Injectable()
export class ConfirmService {

  constructor(private dialog: MatDialog) {
  }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<ComfirmComponent>;
    dialogRef = this.dialog.open(ComfirmComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}
