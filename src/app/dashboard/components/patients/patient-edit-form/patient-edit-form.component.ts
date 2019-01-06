import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { IPatient as Patient } from '../../../models/patient.model';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number-validator';

import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromDashboard from '../../../reducers';
import * as patientsActions from '../../../actions/patients.actions';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../../../core/services/confirm.service'

@Component({
  selector: 'moio-patient-edit-form',
  templateUrl: './patient-edit-form.component.html',
  styleUrls: ['./patient-edit-form.component.scss']
})
export class PatientEditFormComponent implements OnInit, OnDestroy {
  pageTitle = 'Patient Edit';
  errorMessage$: Observable<string>;
  componentActive = true;
  patientEditForm: FormGroup;

  patient: Patient;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // all patient patients
  patientPatients$: Observable<Patient[]> = this.store.pipe(
    select(fromDashboard.getAllPatientUsers)
  );

  // get error state when loading patient patients
  loadPatientPatientsError$: Observable<string> = this.store.pipe(
    select(fromDashboard.getLoadPatientUsersError)
  );

  // get pending state when loading patient patients
  loadPatientPatientsPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getLoadPatientUsersPending)
  );

  /**
   * Patients Table columns
   */
  columns = [
    {
      prop: 'firstname',
      name: this.translate.instant('FirstName')
    },
    {
      prop: 'lastname',
      name: this.translate.instant('LastName')
    },
    {
      prop: 'nursing_home_id',
      name: this.translate.instant('NursingHome')
    },
    {
      prop: 'gender',
      name: this.translate.instant('Gender')
    }
  ];

  constructor(private store: Store<fromDashboard.State>,
              private fb: FormBuilder,
              private translate: TranslateService,
              public confirmService: ConfirmService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      patientname: {
        required: 'Patientname is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.translate.setDefaultLang('de');
  }

  ngOnInit() {
    // Watch for changes to the currently selected patient
    this.store.pipe(
      select(fromDashboard.getSelectedPatient),
      takeWhile(() => this.componentActive)
    ).subscribe(
      patient => {
        if (patient){
          this.patient = patient;
          this.displayPatient(this.patient);
        }
      }
    );

    // Watch for changes to the error message
    this.errorMessage$ = this.store.pipe(select(fromDashboard.getPatientEditionError));

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the patient tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.patientEditForm);
  }

  displayPatient(patient: Patient) {
    // Display the appropriate page title
    this.pageTitle = `${this.patient.firstname} ${this.patient.lastname}`;
    // Define the form group
    this.patientEditForm = this.fb.group({
      id: [patient.id],
      firstname: [patient.firstname],
      lastname: [patient.lastname],
      gender: [patient.gender],    
      nursing_home_id: [patient.nursing_home_id]
    });

    // Watch for value changes
    const formValuechanges = this.patientEditForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.patientEditForm)
    );
  }

  cancelEdit(): void {
    // Redisplay the currently selected patient
    // replacing any edits made
    this.displayPatient(this.patient);
    this.store.dispatch(new patientsActions.DismissEditPatient);


    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.patientEditForm.dirty){
      this.confirmService.confirm({title: title, message: message})
      .subscribe(res => {
        if (res){
          this.store.dispatch(new patientsActions.DismissEditPatient());
        }
      })
    }else{
      this.store.dispatch(new patientsActions.DismissEditPatient());
    }
  }

  deletePatient(): void {
    if (this.patient && this.patient.id) {
      if (confirm(`Really delete the patient: ${this.patient.firstname}?`)) {
        this.store.dispatch(new patientsActions.DeletePatient(this.patient.id));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new patientsActions.DismissEditPatient);
    }
  }

  editPatient(): void {
    console.log(this.patientEditForm.value);
    if (this.patientEditForm.valid) {
      if (this.patientEditForm.dirty) {
        // Copy over all of the original patient properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { id: this.patientEditForm.get('id').value,
                    firstname: this.patientEditForm.get('firstname').value,
                    lastname: this.patientEditForm.get('lastname').value,
                    gender: this.patientEditForm.get('gender').value
                  };

        this.store.dispatch(new patientsActions.EditPatient(p));
      }
    } else {
      this.errorMessage$ = of('Please correct the validation errors.');
    }
  }

}