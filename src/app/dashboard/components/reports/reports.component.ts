import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

/**
 * contains basic page layout for the
 * reports section
 */
@Component({
  selector: 'moio-reports-page',
  templateUrl: './reports.component.html'
})
export class ReportsComponent {

  // get selected report id
  selectedReportId$: Observable<number> = this.store.pipe(
    select(fromDashboard.getSelectedReportId)
  );

  /**
   * constructor
   * @param store Store
   */
  constructor(
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    private snack: MatSnackBar) {
  }

}
