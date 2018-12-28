import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as nursingHomeActions from '../../../actions/nursing-homes.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PatientsApiActions, PatientsActions } from '../../../actions';
import { IPatient } from '../../../models/patient.model';
import { NursingHome } from 'src/app/dashboard/models/nursing-home.model';
import { ConfirmService } from '../../../../core/services/confirm.service'


@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {
  public patientForm: FormGroup;

  // observe patient creation pending state
  createPatientPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getPatientCreationPending)
  );

  // observe errors while saving the patient
  savePatientErrorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getNursingHomePageError)
  );

  // observe pending state while loading nursing homes
  loadNursinghomePending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getNursingHomePagePending)
  );

  // observe errors while loading nursing homes
  loadNursingHomeErrorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getPatientCreationError)
  );

  nursingHomes$: Observable<NursingHome[]> = this.store.pipe(
    select(fromDashboard.getAllNursingHomes)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>, 
    public translate: TranslateService,
    public confirmService: ConfirmService
  ) { 
    translate.setDefaultLang('de');
  }

  ngOnInit() {
    // LoadAllNursingHomes
    this.store.dispatch(new nursingHomeActions.LoadNursingHomes());

    /**
     * Create patientForm group to collect patient details
     */
    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      patientname: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      password_confirmation: ['',Validators.required],
      nursing_home_key: ['',Validators.required]
    },
    {
      // check whether our password and confirm password match
      validator: this.passwordMatchValidator
   })
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const passwordConfirmation: string = control.get('password_confirmation').value; // get password from our password_confirmation form control
    // compare is the password math
    if (password !== passwordConfirmation) {
      // if they don't match, set an error in our passwordConfirmation form control
      control.get('password_confirmation').setErrors({ NoPasswordMatch: true });
    }else{
     if ( control.getError('NoPasswordMatch')){
       control.setErrors(null);
     }
      return null
    }
  }

  /**
   * dispatch new create patient action when form is submitted
   * @param patient
   */
  submit() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      console.log(patient);
      this.store.dispatch(new PatientsActions.CreatePatient({patient}));
    }
    // this.dialogRef.close(this.patientForm.value)
  }

  /**
   * dismiss the open patient form dialogue with confirmation if 
   * the form has unsave data
   */
  cancel(){
    const title = this.translate.instant("ClosePatientForm.title");
    const message = this.translate.instant("ClosePatientForm.message");
    if (this.patientForm.dirty){
      this.confirmService.confirm({title: title, message: message})
      .subscribe(res => {
        if (res){
          this.store.dispatch(new PatientsActions.DismissPatientFormDialog());
        }
      })
    }else{
      this.store.dispatch(new PatientsActions.DismissPatientFormDialog());
    }
  }
}
