import { Component } from '@angular/core';

/**
 * contains basic page layout for the
 * users section
 */
@Component({
  selector: 'moio-users-page',
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class UsersComponent {
}
