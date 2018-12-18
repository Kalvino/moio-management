import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * user edit form component
 */
@Component({
  selector: 'moio-user-edit-form',
  templateUrl: './user-edit-form.component.html'
})
export class UserEditFormComponent implements OnInit {

  // the user to display
  @Input() user;
  @Output() closing: EventEmitter<boolean> = new EventEmitter();

  /**
   * constrctor
   */
  constructor() {
  }

  ngOnInit() {
  }
}
