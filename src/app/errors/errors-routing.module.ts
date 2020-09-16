import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorsRoutes } from './errors.routes';

@NgModule({
  imports: [RouterModule.forChild(errorsRoutes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {
}
