import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/* NGRX */
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatSortModule, MatFormFieldModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  imports: [
    DashboardRoutingModule,
    MatTableModule,
    MatSortModule,
    NgxDatatableModule,
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserFormComponent
  ],
  exports: [
    UsersComponent,
    UserListComponent,
    UserFormComponent,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [UserFormComponent]
})
export class UserModule { }
