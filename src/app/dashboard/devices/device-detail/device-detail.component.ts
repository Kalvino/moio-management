import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';

import {IDevice as Device} from '../../models/device.model';

import {Store, select} from '@ngrx/store';
import * as devicesActions from '../store/actions/device.actions';
import * as fromDashboard from '../../reducers';
import {selectDeviceById, selectAllDevices, getDeviceLoadingState, getDeviceSelectedState} from '../store/selectors/device.selectors';
import {ActivatedRoute} from '@angular/router';
import * as deviceSocketActions from '../store/actions/device-socket.actions';
import * as deviceReportActions from '../store/actions/device-reports.actions';

@Component({
    selector: 'moio-device-detail',
    templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

    device$: Observable<Device>;
    navLinks: any[];
    activeLinkIndex = 0;
    deviceId: number;

    constructor(
        private store: Store<fromDashboard.State>,
        private route: ActivatedRoute,
    ) {

        this.deviceId = parseInt(this.route.snapshot.paramMap.get('device_id'), 10);

        // Set the selected device
        this.store.dispatch(new devicesActions.SetSelectedDevice({deviceId: this.deviceId}));

        // Connecting to the moio Broker namespace /devices/logs and subscribe to the device
        this.store.dispatch(new deviceSocketActions.ConnectClient());
        this.store.dispatch(new deviceSocketActions.Subscribe({deviceId: this.deviceId}));

        this.navLinks = [
            {label: 'Reports', path: 'reports'},
            {label: 'Logs', path: 'logs'},
            {label: 'Settings', path: 'settings'},
            {label: 'Commands', path: 'commands'}
        ];

    }

    ngOnInit() {

        // Remove the reports
        this.store.dispatch(new deviceReportActions.DeleteAllReport());

        // Load the data from the device
        this.store.dispatch(new devicesActions.LoadSingleDeviceRequest());

        // Get device from the store
        this.device$ = this.store.pipe(select(selectDeviceById(this.deviceId)));

    }

    ngOnDestroy() {

        // Disconnect to the moio Broker
        this.store.dispatch(new deviceSocketActions.DisconnectClient());

    }

}
