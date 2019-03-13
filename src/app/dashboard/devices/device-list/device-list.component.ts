import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {IDevice as Device} from '../../models/device.model';

import {Store, select} from '@ngrx/store';
import * as devicesActions from '../store/actions/device.actions';
import * as fromDashboard from '../../reducers';
import {selectAllDevices, getDeviceLoadingState} from '../store/selectors/device.selectors';

@Component({
    selector: 'moio-device-list',
    templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {

    devices$: Observable<Device[]>;
    loading$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<fromDashboard.State>
    ) {

    }

    ngOnInit() {

        // Load all devices by the store
        this.store.dispatch(new devicesActions.LoadAllDevicesRequest());

        // Get all devices from the store
        this.devices$ = this.store.pipe(select(selectAllDevices));

        // Get all devices from the store
        this.loading$ = this.store.pipe(select(getDeviceLoadingState));

    }

    onSelectDevice({selected}) {
        this.router.navigate(['dashboard', 'devices', selected[0].id]);
    }

}
