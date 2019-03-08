import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

// import { INursingHome as NursingHome } from '../../../models/patient.model';
import { NursingHome } from '../../../models/nursing-home.model';
// import { User } from '../../../models/user.model';
import { GenericValidator } from '../../../shared/generic-validator';
// import { NumberValidators } from '../../../shared/number-validator';

import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromDashboard from '../../../reducers';
import * as nursingHomeActions from '../../../actions/nursing-homes.actions';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../../../core/services/confirm.service'

@Component({
  selector: 'moio-nursing-home-edit-form',
  templateUrl: './nursing-home-edit-form.component.html',
  styleUrls: ['./nursing-home-edit-form.component.scss']
})
export class NursingHomeEditFormComponent implements OnInit, OnDestroy {
  pageTitle = 'Nursing Home Edit';
  errorMessage$: Observable<string>;
  componentActive = true;
  nursingHomeEditForm: FormGroup;

  nursingHome: NursingHome;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // // all patient users
  // patientUsers$: Observable<User[]> = this.store.pipe(
  //   select(fromDashboard.getAllNursingHomeUsers)
  // );

  /* 
  patientUsers: User[];

  // get error state when loading patient patients
  loadNursingHomeNursingHomesError$: Observable<string> = this.store.pipe(
    select(fromDashboard.getLoadNursingHomeUsersError)
  );

  // get pending state when loading patient patients
  loadNursingHomeNursingHomesPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getLoadNursingHomeUsersPending)
  );
  */

  constructor(private store: Store<fromDashboard.State>,
    private fb: FormBuilder,
    private translate: TranslateService,
    public confirmService: ConfirmService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: 'Nursing home name is required.'
      },
      key: {
        required: 'Nursing home key is required.'
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
      select(fromDashboard.getSelectedNursingHome),
      takeWhile(() => this.componentActive)
    ).subscribe(
      nursingHome => {
        if (nursingHome) {
          this.nursingHome = nursingHome;
          this.displayNursingHome(this.nursingHome);
        }
      }
    );

    // Watch for changes to the error message
    this.errorMessage$ = this.store.pipe(select(fromDashboard.getNursingHomeEditionError));

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the patient tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.nursingHomeEditForm);
  }

  displayNursingHome(nursingHome: NursingHome) {
    // Display the appropriate page title
    this.pageTitle = `${this.nursingHome.name} ${this.nursingHome.key}`;
    // Define the form group
    this.nursingHomeEditForm = this.fb.group({
      id: [nursingHome.id],
      name: [nursingHome.name, Validators.required],
      key: [nursingHome.key, Validators.required],
    });

    // Watch for value changes
    const formValuechanges = this.nursingHomeEditForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.nursingHomeEditForm)
    );
  }

  cancelEdit(): void {
    // Redisplay the currently selected patient
    // replacing any edits made
    this.displayNursingHome(this.nursingHome);
    this.store.dispatch(new nursingHomeActions.DismissEditNursingHome);


    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.nursingHomeEditForm.dirty) {
      this.confirmService.confirm({ title: title, message: message })
        .subscribe(res => {
          if (res) {
            this.store.dispatch(new nursingHomeActions.DismissEditNursingHome());
          }
        })
    } else {
      this.store.dispatch(new nursingHomeActions.DismissEditNursingHome());
    }
  }

  deleteNursingHome(): void {
    if (this.nursingHome && this.nursingHome.id) {
      if (confirm(`Really delete the nursing home: ${this.nursingHome.name}?`)) {
        this.store.dispatch(new nursingHomeActions.DeleteNursingHome(this.nursingHome.id));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new nursingHomeActions.DismissEditNursingHome);
    }
  }

  editNursingHome(): void {
    console.log(this.nursingHomeEditForm.value);
    if (this.nursingHomeEditForm.valid) {
      if (this.nursingHomeEditForm.dirty) {
        // Copy over all of the original patient properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = {
          id: this.nursingHomeEditForm.get('id').value,
          name: this.nursingHomeEditForm.get('name').value,
          key: this.nursingHomeEditForm.get('key').value
        };
        console.log(p);
        this.store.dispatch(new nursingHomeActions.EditNursingHome(p));
      }
    } else {
      this.errorMessage$ = of('Please correct the validation errors.');
    }
  }

}