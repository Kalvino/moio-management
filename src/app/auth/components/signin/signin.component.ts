import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'moio-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  signin() {
    const signinData = this.signinForm.value;
    console.log(signinData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}
