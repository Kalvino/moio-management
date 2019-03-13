import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {IDevice as Device} from '../../models/device.model';

import {Store, select} from '@ngrx/store';
import * as devicesActions from '../store/actions/device.actions';
import * as fromDashboard from '../../reducers';
import {selectDeviceById, selectAllDevices, getDeviceLoadingState} from '../store/selectors/device.selectors';

@Component({
    selector: 'moio-device-detail',
    templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit {

    device$: Observable<Device>;
    navLinks: any[];
    activeLinkIndex = 0;

    constructor(
        private store: Store<fromDashboard.State>
    ) {

        this.navLinks = [
            {label: 'Logs', path: 'logs'},
            {label: 'Settings', path: 'settings'}];

    }

    ngOnInit() {

        // Load all devices by the store
        this.store.dispatch(new devicesActions.LoadSingleDeviceRequest());

        // Get device from the store
        this.device$ = this.store.pipe(select(selectDeviceById(3)));

    }

}
