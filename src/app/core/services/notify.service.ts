import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { NotifyComponent } from '../components/notify/notify.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * notify data for this service
 */
interface NotifyData {
    title?: string;
    message?: string;
}

/**
 * Confirmation service
 * allows an easy interface to call a notify
 * dialog in the UI
 */
@Injectable({
    providedIn: 'root'
})

export class NotifyService {

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
     * notify opens the dialog
     *
     * @param data NotifyData composed from title and message
     * returns a dialog.afterClosed() Observable.
     * Subscribe to the returned reference to get true | false from
     * the clicked button
     * @return dialogRef MatDialogRef Observable
     */
    public notify(data: NotifyData = {}): Observable<any> {
        data.title = data.title || this.translate.instant('Notify');;
        data.message = data.message || this.translate.instant('That is great');
        let dialogRef: MatDialogRef<NotifyComponent>;
        dialogRef = this.dialog.open(NotifyComponent, {
            width: '380px',
            disableClose: true,
            data: { title: data.title, message: data.message }
        });
        return dialogRef.afterClosed();
    }
}
