import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { NursingHomeFormComponent } from './nursing-home-form/nursing-home-form.component';

/**
 * contains basic page layout for the
 * nursing-home section
 */
@Component({
  selector: 'moio-nursing-home-page',
  templateUrl: './nursing-home.component.html'
})
export class NursingHomeComponent {

  // get selected nursing-home id
  selectedNursingHomeId$: Observable<number> = this.store.pipe(
    select(fromDashboard.getSelectedNursingHomeId)
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

  //add appPatient
  openPopUp() {
    let title = this.translate.instant('NursingHomeFormTitle');
    let dialogRef: MatDialogRef<any> = this.dialog.open(NursingHomeFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title },
      id: 'nursingHomeCreationForm'
    });
  }
}
