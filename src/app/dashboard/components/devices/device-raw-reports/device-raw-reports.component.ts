import { Component, OnInit} from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { IRawDeviceReport } from '../../../models/raw-device-report.model';
import { IDevice } from '../../../models/device.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as rawDeviceReportsActions from '../../../actions/device-raw-reports.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'moio-device-raw-report',
  templateUrl: './device-raw-reports.component.html',
//   styleUrls: ['./device-raw-reports.component.scss']
})
export class DeviceRawReportsComponent implements OnInit {
  
  // selected device in the list
  selectedDeviceId: number;
  componentActive = true;

  ids: string[];
  
  // all devices
  deviceRawReports$: Observable<IRawDeviceReport[]> = this.store.pipe(
    select(fromDashboard.getAllRawDeviceReports)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getRawDeviceReportsPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getRawDeviceReportsPageError)
  );

  /**
   * Device Raw Reports Table columns
   */
  columns = [
    {
      prop: 'device_id',
      name: this.translate.instant('DeviceId')
    },
    {
      prop: 'raw_data',
      name: this.translate.instant('RawData')
    },
    {
      prop: 'tx_address',
      name: this.translate.instant('TxAddress')
    },
    {
      prop: 'tx_ip_address',
      name: this.translate.instant('TxIpAddress')
    },
    {
      prop: 'rx_address',
      name: this.translate.instant('RxAddress')
    },
    {
      prop: 'rx_ip_address',
      name: this.translate.instant('RxIpAddress')
    },
    {
      prop: 'command_code',
      name: this.translate.instant('CommandCode')
    },
    {
      prop: 'telegram_data',
      name: this.translate.instant('TelegramData')
    },
    {
      prop: 'lrc',
      name: this.translate.instant('Lrc')
    },
    {
      prop: 'telegram_status',
      name: this.translate.instant('TelegramStatus')
    },
    {
      prop: 'comments',
      name: this.translate.instant('Comments')
    },
    {
      prop: 'remote_ip_address',
      name: this.translate.instant('RemoteIpAddress')
    },
    {
      prop: 'remote_port',
      name: this.translate.instant('RemotePort')
    },
    {
      prop: 'receipt_date',
      name: this.translate.instant('ReceiptDate')
    },
    {
      prop: 'sent_date',
      name: this.translate.instant('SentDate')
    },
    {
      prop: 'direction',
      name: this.translate.instant('Direction')
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
   * init DeviceRawReportsComponent component
   */
  ngOnInit(): void {
    // Subscribe here because it does not use an async pipe
    this.store.pipe(select(fromDashboard.getSelectedDeviceId)).subscribe((id: number) => {
      console.log(id);
      this.selectedDeviceId = id;
    });

    this.store.dispatch(new rawDeviceReportsActions.LoadDeviceRawReports(this.selectedDeviceId));

    
  }

}
