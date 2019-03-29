import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IDeviceCommand as DeviceCommands} from '../model/device-command.model';
import {select, Store} from '@ngrx/store';
import * as fromDashboard from '../../reducers';
import {getDeviceSelectedState, selectDeviceLogsByDeviceId, selectAllDeviceCommands} from '../store/selectors';
import {SocketService} from '../service/socket.service';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as deviceCommandsActions from '../store/actions/device-commands.actions';
import {DevicesService} from '../service/devices.service';

@Component({
    selector: 'moio-device-commands',
    templateUrl: './device-commands.component.html'
})
export class DeviceCommandsComponent implements OnInit, OnDestroy {

    deviceCommands$: Observable<DeviceCommands[]>;
    deviceId: number;

    private logsSubscription;

    constructor(
        private store: Store<fromDashboard.State>,
        private route: ActivatedRoute,
        private deviceService: DevicesService,
        public translate: TranslateService
    ) {
        translate.setDefaultLang('de');
    }

    ngOnInit() {

        this.store.pipe(select(getDeviceSelectedState)).pipe(take(1)).subscribe((deviceId) => {

            this.deviceId = deviceId;

            this.store.dispatch(new deviceCommandsActions.LoadAllDeviceCommandsRequest());

            this.deviceCommands$ = this.store.pipe(select(selectAllDeviceCommands));

        });

    }

    triggerCommand(commandId) {
        console.log(commandId);
        this.deviceService.triggerDeviceCommands(this.deviceId, commandId).subscribe();
    }

    ngOnDestroy() {


    }


}
