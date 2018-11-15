import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorLayoutComponent } from './containers/error-layout.component';

export const COMPONENTS = [
  ErrorLayoutComponent,
  NotFoundComponent,
  ErrorComponent
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule {
}
