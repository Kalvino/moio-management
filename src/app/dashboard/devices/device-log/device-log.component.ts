import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IDeviceLogs as DeviceLogs} from '../model/device-logs.model';
import {select, Store} from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import * as deviceLogsActions from '../store/actions/device-logs.actions';
import * as deviceSocketActions from '../store/actions/device-socket.actions';
import {getDeviceSelectedState, selectDeviceLogsByDeviceId} from '../store/selectors';
import {SocketService} from '../service/socket.service';
import {take} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'moio-device-log',
    templateUrl: './device-log.component.html'
})
export class DeviceLogComponent implements OnInit, OnDestroy {

    deviceLogs$: Observable<DeviceLogs[]>;
    deviceId: number;
    rawView = false;
    /**
     * subscription on new notifications
     */
    private logsSubscription;

    constructor(
        private store: Store<fromDashboard.State>,
        private route: ActivatedRoute,
        private socketService: SocketService,
        public translate: TranslateService
    ) {
        translate.setDefaultLang('de');
    }

    ngOnInit() {

        this.store.pipe(select(getDeviceSelectedState)).pipe(take(1)).subscribe((deviceId) => {

            this.deviceId = deviceId;

            // this.store.dispatch(new deviceSocketActions.ConnectClient({namespace: this.socketNamespace}));
            // this.store.dispatch(new deviceSocketActions.Subscribe({namespace: this.socketNamespace, deviceId: this.deviceId}));

            // subscribe to the incoming notifications stream
            this.logsSubscription = this.socketService.onLog()
                .subscribe(deviceLogs => {
                    if (deviceLogs) {
                        this.store.dispatch(new deviceLogsActions.IncomingLogs({deviceLogs}));
                    }
                });

            // Load all devices by the store
            // this.store.dispatch(new deviceLogsActions.LoadAllDeviceLogsRequest(deviceId));

            // Get all devices from the store
            this.deviceLogs$ = this.store.pipe(select(selectDeviceLogsByDeviceId(this.deviceId)));

        });

    }

    ngOnDestroy() {

        this.logsSubscription.unsubscribe();

        // this.store.dispatch(new deviceSocketActions.DisconnectClient({namespace: this.socketNamespace}));

    }

    // onSelectDevice($event){
    //     console.log('Device selected');
    // }

}
