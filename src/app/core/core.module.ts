import { NgModule } from '@angular/core';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material';

/**
 * list of components in this module
 */
export const COMPONENTS = [
  ConfirmComponent
];

/**
 * bundles components and services
 * shared over all modules
 */
@NgModule({
  declarations: COMPONENTS,
  imports: [MaterialModule, TranslateModule],
  exports: [
    MaterialModule,
    TranslateModule,
    COMPONENTS
  ],
  providers: [],
  entryComponents: [ConfirmComponent]
})
export class CoreModule {
}
