import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRoutes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
