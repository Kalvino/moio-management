import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { PatientFormComponent } from './patient-form/patient-form.component';

/**
 * contains basic page layout for the
 * patients section
 */
@Component({
  selector: 'moio-patients-page',
  templateUrl: './patients.component.html'
})
export class PatientsComponent {

  // get selected patient id
  selectedPatientId$: Observable<number> = this.store.pipe(
    select(fromDashboard.getSelectedPatientId)
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
    let title = this.translate.instant('PatientFormTitle');
    let dialogRef: MatDialogRef<any> = this.dialog.open(PatientFormComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title },
      id: 'patientCreationForm'
    });
  }
}
