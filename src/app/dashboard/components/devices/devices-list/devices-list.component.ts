import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

import { IDevice } from '../../../models/device.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as devicesActions from '../../../actions/devices.actions';
import * as deviceReportsActions from '../../../actions/device-reports.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { DevicesService } from '../../../services/devices.service';

@Component({
  selector: 'moio-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit, OnDestroy {
  
  // Used to select device in the list
  selectedDevice: IDevice | null;
  componentActive = true;

  ids: string[];
  
  // all devices
  devices$: Observable<IDevice[]> = this.store.pipe(
    select(fromDashboard.getAllDevices)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getDevicesPagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getDevicesPageError)
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
    private snack: MatSnackBar,
    private router: Router,
    private devicesService: DevicesService) {

      this.translate.setDefaultLang('de');

  }

  devices: Observable<IDevice[]>;

  /**
   * init DeviceListComponent component
   */
  ngOnInit(): void {

    this.store.dispatch(new devicesActions.LoadDevices());

    this.store.pipe(select(fromDashboard.getDevicesIds))
    .subscribe((ids: string[]) => this.ids = ids);

    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromDashboard.getSelectedDevice),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentDevice => this.selectedDevice = currentDevice
    );
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Create Device action
  newDevice(): void {
    this.store.dispatch(new devicesActions.InitializeDevice());
  }

  // Get parsed reports
  parsedReports(device: IDevice){
    console.log(device);
    this.selectDevice(device);
    this.router.navigate(['dashboard', 'devices', device.id, 'parsed-reports']);

    // this.store.dispatch(new deviceReportsActions.LoadDeviceReports(device.id));
  }
  // Get raw reports
  rawReports(device: IDevice){
    console.log(device);
    this.selectDevice(device);
    this.router.navigate(['dashboard', 'devices', device.id, 'raw-reports']);
  }
  // Get device details
  deviceDetails(device: IDevice){
    console.log(device);
    this.selectDevice(device);
  }

  // Trigger Dataless device commands/// TODO NGRX
  triggerCommand(deviceId, commandId) {
    this.devicesService.triggerDeviceCommands(deviceId, commandId).subscribe();
  }

  // Select device action
  selectDevice(device: IDevice): void {
    this.store.dispatch(new devicesActions.SelectDevice(device));
  }

  /**
   * emit the selected device
   * the datatable component returns an ARRAY of selected
   * elements depending on the 'selectionType' setting.
   * In our case just a single device!
   * Therefor emit 0th element of the selection.
   *
   * @param selected Device first element of array
   */
  onSelectRow({selected}) {
    // this.deviceSelected.emit(selected[0]);
    const device = selected[0];
    this.store.dispatch(new devicesActions.SelectDevice(device));
    
  }

}
