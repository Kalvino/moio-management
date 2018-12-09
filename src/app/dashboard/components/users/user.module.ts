import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/* NGRX */
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatSortModule, MatFormFieldModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from '../../dashboard-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { NursingHomeFormComponent } from '../nursing-homes/nursing-home-form/nursing-home-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    TranslateModule,
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
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserFormComponent,
    NursingHomeFormComponent
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
    MatButtonModule,
    NursingHomeFormComponent,
    MatSelectModule
  ],
  entryComponents: [UserFormComponent]
})
export class UserModule { }
