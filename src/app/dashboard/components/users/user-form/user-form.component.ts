import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
      nursing_home_key: [item.nursing_home_key || '']
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
