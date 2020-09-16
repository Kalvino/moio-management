import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';

/**
 * component to show a lock screen
 */
@Component({
  selector: 'moio-lockscreen',
  templateUrl: './lockscreen.component.html'
})
export class LockscreenComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  lockscreenData = {
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  /**
   * unlock function
   */
  unlock() {
    console.log(this.lockscreenData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}
