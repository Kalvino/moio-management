import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '../../reducers';
import { AuthPageActions } from '../../actions';

@Component({
  selector: 'moio-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  // get any error
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromAuth.getError)
  );

  constructor(private store: Store<fromAuth.State>, private translate: TranslateService) {
    translate.setDefaultLang('de');
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.store.pipe(
      select(fromAuth.getPending),
    ).subscribe(pending => {

      if (pending) {
        this.progressBar.mode = 'indeterminate';
        this.signinForm.disable();
      } else {
        this.progressBar.mode = 'determinate';
        this.signinForm.enable();
      }
    });
  }

  /**
   * submit the form
   */
  signin() {
    const signinData = this.signinForm.value;

    this.store.dispatch(new AuthPageActions.Login({credentials: signinData}));
  }

}
