import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {IDevice as Device} from '../../models/device.model';

import {Store, select} from '@ngrx/store';
import * as devicesActions from '../store/actions/device.actions';
import * as fromDashboard from '../../reducers';
import {selectDeviceById, selectAllDevices, getDeviceLoadingState, getDeviceSelectedState} from '../store/selectors/device.selectors';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'moio-device-detail',
    templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit {

    device$: Observable<Device>;
    selectedDeviceId$: Observable<number>;
    navLinks: any[];
    activeLinkIndex = 0;
    deviceId: number;

    constructor(
        private store: Store<fromDashboard.State>,
        private route: ActivatedRoute,
    ) {

        this.deviceId = parseInt(this.route.snapshot.paramMap.get('device_id'), 10);

        this.store.dispatch(new devicesActions.SetSelectedDevice({deviceId: this.deviceId}));


        this.navLinks = [
            {label: 'Logs', path: 'logs'},
            {label: 'Settings', path: 'settings'}];

    }

    ngOnInit() {

        // Load all devices by the store
        this.store.dispatch(new devicesActions.LoadSingleDeviceRequest());

        // Get device from the store
        this.device$ = this.store.pipe(select(selectDeviceById(this.deviceId)));

    }

}
