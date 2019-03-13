import {Component, OnInit} from '@angular/core';

import {Store, select} from '@ngrx/store';

import * as deviceSettingsActions from '../store/actions/device-settings.actions';
import * as fromDashboard from '../../reducers';
import {selectDeviceSettingsByDeviceId} from '../store/selectors';
import {Observable} from 'rxjs';
import {IDevice as Device} from '../../models/device.model';
import {IDeviceSetting as DeviceSettings} from '../model/device-settings.model';


@Component({
    selector: 'moio-device-settings',
    templateUrl: './device-settings.component.html'
})
export class DeviceSettingsComponent implements OnInit {

    deviceSettings$: Observable<DeviceSettings[]>;
    deviceSettings: DeviceSettings[];
    deviceSettingsCategories: string[];

    constructor(
        private store: Store<fromDashboard.State>
    ) {
    }

    ngOnInit() {

        // Load all devices by the store
        this.store.dispatch(new deviceSettingsActions.LoadAllDeviceSettingsRequest());

        // Get all devices from the store
        this.deviceSettings$ = this.store.pipe(select(selectDeviceSettingsByDeviceId(3)));

        this.deviceSettings$.subscribe((deviceSettings) => {

            this.deviceSettings = deviceSettings;

            if (this.deviceSettings.length > 0) {

                this.deviceSettingsCategories = this.deviceSettings
                    .map(item => item.category)
                    .filter(function (value, index, self) {
                        return self.indexOf(value) === index;
                    });

            }

        });

    }

    read() {
        return false;
    }

    write() {
        return false;
    }

    getSettingsByCategory(category) {
        return this.deviceSettings.filter((device) => device.category === category);
    }

}
