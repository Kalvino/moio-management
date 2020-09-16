import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { UserFormComponent } from './user-form/user-form.component';

/**
 * contains basic page layout for the
 * users section
 */
@Component({
  selector: 'moio-users-page',
  templateUrl: './users.component.html'
})
export class UsersComponent {

  // get selected user id
  selectedUserId$: Observable<number> = this.store.pipe(
    select(fromDashboard.getSelectedUserId)
  );

  /**
   * constructor
   * @param store Store
   */
  constructor(
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private snack: MatSnackBar) {

  }

   //add appUser
   openPopUp() { 
    let title = this.translate.instant('UserFormTitle');
    let dialogRef: MatDialogRef<any> = this.dialog.open(UserFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title },
      id: 'userCreationForm'
    });
  }
}
