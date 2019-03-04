import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DeviceContainerComponent} from './device-container/device-container.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {DeviceLogComponent} from './device-log/device-log.component';
import {DeviceSettingsComponent} from './device-settings/device-settings.component';

const routes: Routes = [
    {
        path: '',
        component: DeviceContainerComponent,
        data: {
            title: 'Devices',
            breadcrumb: 'Devices'
        },
        children: [
            {
                path: '',
                component: DeviceListComponent
            },
            {
                path: ':device_id',
                component: DeviceDetailComponent,
                data: {
                    title: 'Devices details',
                    breadcrumb: 'Devices Details'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'logs',
                    },
                    {
                        path: 'logs',
                        component: DeviceLogComponent,
                        data: {
                            title: 'Logs',
                            breadcrumb: 'Logs'
                        }
                    },
                    {
                        path: 'settings',
                        component: DeviceSettingsComponent,
                        data: {
                            title: 'Settings',
                            breadcrumb: 'Settings'
                        }
                    },
                ]
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {
}
