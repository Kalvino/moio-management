import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const MODULES = [
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatInputModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule {
}
