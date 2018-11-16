import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { AuthPageActions } from '../../actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'moio-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.store.pipe(
      select(fromAuth.getPending),
      map(pending => {
        if (pending) {
          this.progressBar.mode = 'indeterminate';
          this.signinForm.disable();
        } else {
          this.progressBar.mode = 'determinate';
          this.signinForm.enable();
        }
      })
    );
  }

  /**
   * submit the form
   */
  signin() {
    const signinData = this.signinForm.value;

    this.store.dispatch(new AuthPageActions.Login({credentials: signinData}));
  }

}
