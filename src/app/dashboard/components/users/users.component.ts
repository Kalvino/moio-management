import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import { Observable } from 'rxjs';

/**
 * contains basic page layout for the
 * users section
 */
@Component({
  selector: 'moio-users-page',
  templateUrl: './users.component.html'
})
export class UsersComponent {

  // get selected user id
  selecteduserId$: Observable<number> = this.store.pipe(
    select(fromDashboard.getSelectedUserId)
  );

  /**
   * constructor
   * @param store Store
   */
  constructor(
    private store: Store<fromDashboard.State>) {

  }
}
