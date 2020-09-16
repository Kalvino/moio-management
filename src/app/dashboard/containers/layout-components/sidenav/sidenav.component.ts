import { Component, OnInit, Input } from '@angular/core';

/**
 * Sidenav component
 */
@Component({
  selector: 'moio-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent implements OnInit {

  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  constructor() {
  }

  /**
   * on init lifecycle hook
   */
  ngOnInit() {
  }
}
