import { Component } from '@angular/core';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title>{{'Logout' | translate}}</h2>
    <mat-dialog-content>{{'Are you sure you want to logout?' | translate}}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">{{'Cancel' | translate}}</button>
      <button mat-button [mat-dialog-close]="true">{{'OK' | translate}}</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
      }

      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }

      [mat-button] {
        padding: 0;
      }
    `,
  ],
})
export class LogoutConfirmationDialogComponent {}
