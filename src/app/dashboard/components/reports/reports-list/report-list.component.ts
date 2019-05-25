import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ReportDetailsComponent } from '../report-details/report-details.component';

import { Report } from '../../../models/report.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as reportsActions from '../../../actions/reports.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'moio-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnDestroy {
  
  // Used to select report in the list
  selectedReport: Report | null;
  componentActive = true;


  /**
   * Reports Table columns
   */
  columns = [
    {
      prop: 'reportType',
      name: this.translate.instant('ReportType')
    },
    {
      prop: 'alarmCode',
      name: this.translate.instant('AlarmCode')
    },
    {
      prop: 'alarmName',
      name: this.translate.instant('AlarmName')
    },
    {
      prop: 'positionCode',
      name: this.translate.instant('positionCode')
    },
    {
      prop: 'positionName',
      name: this.translate.instant('PositionName')
    },
    {
      prop: 'beaconStatus',
      name: this.translate.instant('BeaconStatus')
    },
    {
      prop: 'latitude',
      name: this.translate.instant('Latitude')
    },
    {
      prop: 'longitude',
      name: this.translate.instant('Longitude')
    },
    {
      prop: 'sensorStatus',
      name: this.translate.instant('SensorStatus')
    },
    {
      prop: 'date',
      name: this.translate.instant('Date')
    },
    {
      prop: 'time',
      name: this.translate.instant('Time')
    },
    {
      prop: 'dayOfWeek',
      name: this.translate.instant('DayOfWeek')
    },
    {
      prop: 'batteryHealth',
      name: this.translate.instant('BatteryStatus')
    },
    // {
    //   prop: 'createdAt',
    //   name: this.translate.instant('CreatedAt')
    // }
  ];

  ids: string[];
  
  // all reports
  reports$: Observable<Report[]> = this.store.pipe(
    select(fromDashboard.getAllReports)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getReportPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getReportPageError)
  );

  /**
   * constructor
   * @param store Store
   * @param translate TranslateService
   */
  constructor(
    private store: Store<fromDashboard.State>, 
    private translate: TranslateService,
    private dialog: MatDialog,
    private snack: MatSnackBar) {

      this.translate.setDefaultLang('de');

  }

  public items: Report[];
  reports: Observable<Report[]>;

  /**
   * init ReportListComponent component
   */
  ngOnInit(): void {

    this.store.dispatch(new reportsActions.LoadReports());

    this.reports = this.store.pipe(select(fromDashboard.getAllReports)) as Observable<Report[]>;

    this.store.pipe(select(fromDashboard.getReportsIds))
    .subscribe((ids: string[]) => this.ids = ids);

    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromDashboard.getSelectedReport),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentReport => this.selectedReport = currentReport
    );
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Create Report action
  newReport(): void {
    this.store.dispatch(new reportsActions.InitializeReport());
  }

  // Select report action
  selectReport(report: Report): void {
    this.store.dispatch(new reportsActions.SelectReport(report));
  }

  /**
   * emit the selected report
   * the datatable component returns an ARRAY of selected
   * elements depending on the 'selectionType' setting.
   * In our case just a single report!
   * Therefor emit 0th element of the selection.
   *
   * @param selected Report first element of array
   */
  onSelectRow({selected}) {
    // this.reportSelected.emit(selected[0]);
    const report = selected[0];
    this.store.dispatch(new reportsActions.SelectReport(report));
    
  }

}
