import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDeviceLogs as DeviceLogs} from '../model/device-logs.model';
import {select, Store} from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import * as deviceLogsActions from '../store/actions/device-logs.actions';
import {selectDeviceLogsByDeviceId} from '../store/selectors';

@Component({
    selector: 'moio-device-log',
    templateUrl: './device-log.component.html'
})
export class DeviceLogComponent implements OnInit {

    deviceLogs$: Observable<DeviceLogs[]>;

    constructor(
        private store: Store<fromDashboard.State>
    ) {
    }

    ngOnInit() {

        // Load all devices by the store
        this.store.dispatch(new deviceLogsActions.LoadAllDeviceLogsRequest());

        // Get all devices from the store
        this.deviceLogs$ = this.store.pipe(select(selectDeviceLogsByDeviceId(3)));

    }

    onSelectDevice($event){
        console.log('Device selected');
    }

}
