import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { User } from '../../../models/user.model';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number-validator';

import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromDashboard from '../../../reducers';
import * as usersActions from '../../../actions/users.actions';
import { IPatient } from 'src/app/dashboard/models/patient.model';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../../../core/services/confirm.service'

@Component({
  selector: 'moio-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit, OnDestroy {
  pageTitle = 'User Edit';
  errorMessage$: Observable<string>;
  componentActive = true;
  userEditForm: FormGroup;

  user: User;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // all user patients
  userPatients$: Observable<IPatient[]> = this.store.pipe(
    select(fromDashboard.getAllUserPatients)
  );

  // get error state when loading user patients
  loadUserPatientsError$: Observable<string> = this.store.pipe(
    select(fromDashboard.getLoadUserPatientsError)
  );

  // get pending state when loading user patients
  loadUserPatientsPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getLoadUserPatientsPending)
  );

  constructor(private store: Store<fromDashboard.State>,
              private fb: FormBuilder,
              private translate: TranslateService,
              public confirmService: ConfirmService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      username: {
        required: 'Username is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.translate.setDefaultLang('de');
  }

  ngOnInit() {
    // Watch for changes to the currently selected user
    this.store.pipe(
      select(fromDashboard.getSelectedUser),
      takeWhile(() => this.componentActive)
    ).subscribe(
      user => {
        if (user){
          this.user = user;
          this.displayUser(this.user);
        }
      }
    );

    // Watch for changes to the error message
    this.errorMessage$ = this.store.pipe(select(fromDashboard.getUserEditionError));

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.userEditForm);
  }

  displayUser(user: User) {
    // Display the appropriate page title
    this.pageTitle = `${this.user.firstname} ${this.user.lastname}`;
    // Define the form group
    this.userEditForm = this.fb.group({
      id: [user.id],
      firstname: [user.firstname],
      lastname: [user.lastname],
      email: [user.email,[Validators.email]],
      username: [user.username, Validators.required],      
      nursing_home: [user.nursing_home],
      registered_on: [user.registered_on],
      last_login: [user.last_login]
    });

    // Watch for value changes
    const formValuechanges = this.userEditForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.userEditForm)
    );
  }

  cancelEdit(): void {
    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.userEditForm.dirty){
      this.confirmService.confirm({title: title, message: message})
      .subscribe(res => {
        if (res){
          this.store.dispatch(new usersActions.DismissEditUser());
        }
      })
    }else{
      this.store.dispatch(new usersActions.DismissEditUser());
    }
  }

  deleteUser(): void {
    if (this.user && this.user.id) {
      if (confirm(`Really delete the user: ${this.user.firstname}?`)) {
        this.store.dispatch(new usersActions.DeleteUser(this.user.id));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new usersActions.DismissEditUser);
    }
  }

  editUser(): void {
    console.log(this.userEditForm.value);
    if (this.userEditForm.valid) {
      if (this.userEditForm.dirty) {
        // Copy over all of the original user properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { id: this.userEditForm.get('id').value,
                    firstname: this.userEditForm.get('firstname').value,
                    lastname: this.userEditForm.get('lastname').value,
                    email: this.userEditForm.get('email').value,
                    username: this.userEditForm.get('username').value
                  };

        this.store.dispatch(new usersActions.EditUser(p));
      }
    } else {
      this.errorMessage$ = of('Please correct the validation errors.');
    }
  }

}