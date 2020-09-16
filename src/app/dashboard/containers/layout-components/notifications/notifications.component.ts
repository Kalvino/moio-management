import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'moio-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  // Dummy notifications
  notifications = [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Server rebooted',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }

  /**
   * clear all notifications
   */
  clearAll(event) {
    event.preventDefault();
    this.notifications = [];
  }
}
