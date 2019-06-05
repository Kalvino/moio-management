import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { IParsedDeviceReport } from '../../../models/parsed-device-report.model';
import { IDevice } from '../../../models/device.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as parsedDeviceReportsActions from '../../../actions/device-parsed-reports.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'moio-device-parsed-report',
  templateUrl: './device-parsed-reports.component.html',
//   styleUrls: ['./device-parsed-reports.component.scss']
})
export class DeviceParsedReportsComponent implements OnInit, OnDestroy {
  
  // selected device in the list
  selectedDeviceId: number;
  componentActive = true;

  ids: string[];
  
  // all devices
  deviceParsedReports$: Observable<IParsedDeviceReport[]> = this.store.pipe(
    select(fromDashboard.getAllParsedDeviceReports)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getParsedDeviceReportsPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getParsedDeviceReportsPageError)
  );

  /**
   * Device Parsed Reports Table columns
   */
  columns = [
    {
      prop: 'reportType',
      name: this.translate.instant('ReportType')
    },
    {
      prop: 'IpAddress',
      name: this.translate.instant('IpAddress')
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
      name: this.translate.instant('PositionCode')
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
      name: this.translate.instant('BatteryHealth')
    },
    {
      prop: 'batteryVoltage',
      name: this.translate.instant('BatteryVoltage')
    },
    {
      prop: 'gusimSerialNumber',
      name: this.translate.instant('GusimSerialNumber')
    },
    {
      prop: 'xAngle',
      name: this.translate.instant('XAngle')
    },
    {
      prop: 'yAngle',
      name: this.translate.instant('YAngle')
    },
    {
      prop: 'zAngle',
      name: this.translate.instant('ZAngle')
    },
    {
      prop: 'imuInterruptStatus',
      name: this.translate.instant('ImuInterruptStatus')
    },
    {
      prop: 'createdAt',
      name: this.translate.instant('CreatedAt')
    }
  ];

  /**
   * constructor
   * @param store Store
   * @param translate TranslateService
   */
  constructor(
    private store: Store<fromDashboard.State>, 
    private translate: TranslateService) {

      this.translate.setDefaultLang('de');

  }

  /**
   * init DeviceParsedReportsComponent component
   */
  ngOnInit(): void {
    // Subscribe here because it does not use an async pipe
    this.store.pipe(
        select(fromDashboard.getSelectedDeviceId),
        takeWhile(() => this.componentActive)
      ).subscribe(
        (id: number) => this.selectedDeviceId = id
      );

    this.store.dispatch(new parsedDeviceReportsActions.LoadDeviceParsedReports(this.selectedDeviceId));

    
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
