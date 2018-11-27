import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

/* NGRX */
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatSortModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from '../../dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    NgxDatatableModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
  ],
  exports: [
    UsersComponent,
    UserListComponent,
  ]
})
export class UserModule { }
