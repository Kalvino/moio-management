import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../components/loader/loader.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * a loader service
 * to show a loader as a Mat Dialog
 * while busy
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  dialogRef: MatDialogRef<LoaderComponent>;

  /**
   * constructor
   * @param dialog MatDialog
   * @param translate TranslateService
   */
  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
  }

  /**
   * open the loader
   * @param title string the title for the loader. default: Please wait
   * @return dialogRef Observable
   */
  public open(title: string = 'Please wait'): Observable<boolean> {
    this.dialogRef = this.dialog
      .open(LoaderComponent, {disableClose: true, backdropClass: 'light-backdrop'});
    this.dialogRef.updateSize('200px');
    this.dialogRef.componentInstance.title = this.translate.instant(title);

    return this.dialogRef.afterClosed();
  }

  /**
   * close the dialog / loader programmatically
   */
  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
