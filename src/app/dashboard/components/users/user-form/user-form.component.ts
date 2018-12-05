import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as userActions from '../../../actions/users.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UsersApiActions, UsersActions } from '../../../actions';
import { User } from '../../../models/user.model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>, 
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      firstname: [item.firstname || '', Validators.required],
      lastname: [item.lastname || ''],
      username: [item.username || ''],
      email: [item.email || ''],
      password: [item.password || ''],
      confirm_password: [item.confirm_password],
      nursing_home_key: [item.nursing_home_key || '']
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

  /**
   * dispatch new create user action when form is submitted
   * @param user
   */
  onFormSubmitted(user: User) {
    this.store.dispatch(new UsersActions.CreateUser({user}));
  }

  cancel(){
    this.store.dispatch(new UsersActions.DismissPoppedUpUserForm());
  }
}
