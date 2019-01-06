import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as nursingHomeActions from '../../../actions/nursing-homes.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UsersApiActions, UsersActions } from '../../../actions';
import { User } from '../../../models/user.model';
import { NursingHome } from 'src/app/dashboard/models/nursing-home.model';
import { ConfirmService } from '../../../../core/services/confirm.service'


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  // observe user creation pending state
  createUserPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getUserCreationPending)
  );

  // observe errors while saving the user
  saveUserErrorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getNursingHomePageError)
  );

  // observe pending state while loading nursing homes
  loadNursinghomePending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getNursingHomePagePending)
  );

  // observe errors while loading nursing homes
  loadNursingHomeErrorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getUserCreationError)
  );

  nursingHomes$: Observable<NursingHome[]> = this.store.pipe(
    select(fromDashboard.getAllNursingHomes)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserFormComponent>,
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
     * Create userForm group to collect user details
     */
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: ['', Validators.required],
      email: ['',[Validators.email]],
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
   * dispatch new create user action when form is submitted
   * @param user
   */
  submit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      console.log(user);
      this.store.dispatch(new UsersActions.CreateUser({user}));
    }
    // this.dialogRef.close(this.userForm.value)
  }

  /**
   * dismiss the open user form dialogue with confirmation if 
   * the form has unsave data
   */
  cancel(){
    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.userForm.dirty){
      this.confirmService.confirm({title: title, message: message})
      .subscribe(res => {
        if (res){
          this.store.dispatch(new UsersActions.DismissUserFormDialog());
        }
      })
    }else{
      this.store.dispatch(new UsersActions.DismissUserFormDialog());
    }
  }
}
