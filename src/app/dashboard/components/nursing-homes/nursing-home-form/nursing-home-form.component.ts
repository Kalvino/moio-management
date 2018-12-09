import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as nursingHomeActions from '../../../actions/nursing-homes.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NursingHomesApiActions, NursingHomesActions } from '../../../actions';
import { NursingHome } from '../../../models/nursing-home.model';

@Component({
  selector: 'nursing-home-form',
  templateUrl: './nursing-home-form.component.html'
})
export class NursingHomeFormComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NursingHomeFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>, 
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)

    this.store.dispatch(new nursingHomeActions.LoadNursingHomes());
  }
  
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      key: [item.firstname || '', Validators.required],
      name: [item.lastname || '', Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

  /**
   * dispatch new create nursingHome action when form is submitted
   * @param nursingHome
   */
  onFormSubmitted(nursingHome: NursingHome) {
    this.store.dispatch(new NursingHomesActions.CreateNursingHome({nursingHome}));
  }

  cancel(){
    this.store.dispatch(new NursingHomesActions.DismissPoppedUpNursingHomeForm());
  }
}
