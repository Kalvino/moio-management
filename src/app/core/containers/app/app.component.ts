import { Component } from '@angular/core';

/**
 * App Component
 * A view component for the app
 * to allow individual styling for the view
 * and all of it's child views
 */
@Component({
  selector: 'moio-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'moio-management';
}
