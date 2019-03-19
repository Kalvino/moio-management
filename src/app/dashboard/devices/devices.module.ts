import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../material';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './store/reducers';
import {effects} from './store/effects';

import { OrderModule } from 'ngx-order-pipe';

import {DevicesRoutingModule} from './devices-routing.module';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {DeviceContainerComponent} from './device-container/device-container.component';
import {DeviceLogComponent} from './device-log/device-log.component';
import {DeviceSettingsComponent} from './device-settings/device-settings.component';
import {DeviceCommandComponent} from './device-log/device-command/device-command.component';
import {DeviceDataComponent} from './device-log/device-data/device-data.component';

@NgModule({
    declarations: [
        DeviceListComponent,
        DeviceDetailComponent,
        DeviceContainerComponent,
        DeviceLogComponent,
        DeviceSettingsComponent,
        DeviceCommandComponent,
        DeviceDataComponent
    ],
    imports: [
        StoreModule.forFeature('deviceState', reducers),
        EffectsModule.forFeature(effects),
        CommonModule,
        DevicesRoutingModule,
        NgxDatatableModule,
        TranslateModule,
        MaterialModule,
        FormsModule,
        OrderModule
    ]
})
export class DevicesModule {
}
