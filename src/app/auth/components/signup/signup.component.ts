import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';

/**
 * signup component
 */
@Component({
  selector: 'moio-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup;
  
  /**
   * constructor
   */
  constructor() {
  }

   /**
   * on init life cycle callback
   */
  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', Validators.required);

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password,
      confirmPassword: confirmPassword,
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return {agreed: true};
        }
        return null;
      })
    });
  }

  /**
   * signup / submit form
   */
  signup() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}
