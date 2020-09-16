import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { PatientFormComponent } from '../patient-form/patient-form.component';

import { IPatient as Patient} from '../../../models/patient.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as patientsActions from '../../../actions/patients.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'moio-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, OnDestroy {
  
  // Used to select patient in the list
  selectedPatient: Patient | null;
  componentActive = true;

  ids: string[];
  
  // all patients
  patients$: Observable<Patient[]> = this.store.pipe(
    select(fromDashboard.getAllPatients)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getPatientPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getPatientPageError)
  );

  /**
   * constructor
   * @param store Store
   * @param translate TranslateService
   */
  constructor(
    private store: Store<fromDashboard.State>, 
    private translate: TranslateService,
    private dialog: MatDialog,
    private snack: MatSnackBar) {

      this.translate.setDefaultLang('de');

  }

  public items: Patient[];
  patients: Observable<Patient[]>;

  /**
   * init PatientListComponent component
   */
  ngOnInit(): void {

    this.store.dispatch(new patientsActions.LoadPatients());

    this.patients = this.store.pipe(select(fromDashboard.getAllPatients)) as Observable<Patient[]>;

    this.store.pipe(select(fromDashboard.getPatientsIds))
    .subscribe((ids: string[]) => this.ids = ids);

    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromDashboard.getSelectedPatient),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentPatient => this.selectedPatient = currentPatient
    );
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Create Patient action
  newPatient(): void {
    this.store.dispatch(new patientsActions.InitializePatient());
  }

  // Select patient action
  selectPatient(patient: Patient): void {
    this.store.dispatch(new patientsActions.SelectPatient(patient));
  }

  /**
   * emit the selected patient
   * the datatable component returns an ARRAY of selected
   * elements depending on the 'selectionType' setting.
   * In our case just a single patient!
   * Therefor emit 0th element of the selection.
   *
   * @param selected Patient first element of array
   */
  onSelectRow({selected}) {
    // this.patientSelected.emit(selected[0]);
    const patient = selected[0];
    this.store.dispatch(new patientsActions.SelectPatient(patient));
    // this.store.dispatch(new patientsActions.LoadPatientUsers(patient.id));
    
  }

}
