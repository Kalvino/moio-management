import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {IDeviceLogs as DeviceLogs} from '../model/device-logs.model';
import {select, Store} from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../service/socket.service';
import {TranslateService} from '@ngx-translate/core';
import {getDeviceSelectedState, selectDeviceReportsByDeviceId, getLastElements} from '../store/selectors';
import {take} from 'rxjs/operators';
import * as deviceReportsActions from '../store/actions/device-reports.actions';
// import * as deviceLogsActions from '../store/actions/device-logs.actions';
import * as deviceSocketActions from '../store/actions/device-socket.actions';

@Component({
    selector: 'moio-device-reports',
    templateUrl: './device-reports.component.html'
})
export class DeviceReportsComponent implements OnInit, OnDestroy {

    deviceReports$: Observable<DeviceLogs[]>;
    deviceId: number;

    /**
     * subscription on new notifications
     */
    private reportsSubscription;

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

            // subscribe to the incoming notifications stream
            this.reportsSubscription = this.socketService.onReport()
                .subscribe(deviceReports => {
                    if (deviceReports) {
                        this.store.dispatch(new deviceReportsActions.IncomingReport({deviceReports}));
                    }
                });

        });

        this.store.pipe(select(getLastElements(10))).pipe().subscribe((lastElements) => {
            lastElements.forEach((id) => {
                this.store.dispatch(new deviceReportsActions.DeleteReport({id: id}));
            });
        });

        // Get all devices from the store
        this.deviceReports$ = this.store.pipe(select(selectDeviceReportsByDeviceId(this.deviceId)));

    }

    ngOnDestroy() {

        this.reportsSubscription.unsubscribe();

        // this.store.dispatch(new deviceSocketActions.DisconnectClient({namespace: this.socketNamespace}));

    }


}
