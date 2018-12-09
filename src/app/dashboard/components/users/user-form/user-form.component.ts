import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      password_confirmation: ['',Validators.required],
      nursing_home_key: ['',Validators.required]
    })
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
    const title = this.translate.instant("CloseUserForm.title");
    const message = this.translate.instant("CloseUserForm.message");
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
