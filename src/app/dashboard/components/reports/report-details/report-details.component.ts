import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Report } from '../../../models/report.model';

import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromDashboard from '../../../reducers';
import * as reportsActions from '../../../actions/reports.actions';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '../../../../core/services/confirm.service'

@Component({
  selector: 'moio-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Report Edit';
  errorMessage$: Observable<string>;
  componentActive = true;

  report: Report;

  constructor(private store: Store<fromDashboard.State>,
              private translate: TranslateService,
              public confirmService: ConfirmService) {

    this.translate.setDefaultLang('de');
  }

  ngOnInit() {
    // Watch for changes to the currently selected report
    this.store.pipe(
      select(fromDashboard.getSelectedReport),
      takeWhile(() => this.componentActive)
    ).subscribe(
      report => {
        if (report){
          this.report = report;
          console.log(this.report);
          this.displayReport(this.report);
        }
      }
    );

    // Watch for changes to the error message
    this.errorMessage$ = this.store.pipe(select(fromDashboard.getReportEditionError));

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  displayReport(report: Report) {
    // Display the appropriate page title
    this.pageTitle = `${this.report.alarmName}`;
  }

  closeDetails(): void {
    this.store.dispatch(new reportsActions.DismissEditReport());
  }

  deleteReport(): void {
    if (this.report && this.report.id) {
      if (confirm(`Really delete the report: ${this.report.alarmName}?`)) {
        this.store.dispatch(new reportsActions.DeleteReport(this.report.id));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new reportsActions.DismissEditReport);
    }
  }

}