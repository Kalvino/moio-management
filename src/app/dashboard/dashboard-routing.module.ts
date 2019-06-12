import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { BlankComponent } from './components/blank/blank.component';
import { UsersComponent } from './components/users/users.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PatientsComponent } from './components/patients/patients.component';
import { NursingHomeComponent } from './components/nursing-homes/nursing-home.component';
import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './containers/dashboard-layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DevicesComponent } from './components/devices/devices.component';
import { DevicesListComponent } from './components/devices/devices-list/devices-list.component';
import { DevicesContainerComponent } from './components/devices/devices-container.component';
import { DeviceParsedReportsComponent } from './components/devices/device-parsed-reports/device-parsed-reports.component'
import { DeviceRawReportsComponent } from './components/devices/device-raw-reports/device-raw-reports.component';

/**
 * Dashboard module routings
 * protected by AuthGuard
**/
export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard',
      breadcrumb: 'Dashboard'
    },
    children: [
      {
        path: '',
        redirectTo: 'blank',
        pathMatch: 'full'
      },
      {
        path: 'blank',
        component: BlankComponent,
        data: {
          title: 'Blank',
          breadcrumb: 'Blank'
        }
      }, 
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
          breadcrumb: 'Users'
        }
      }, 
      {
        path: 'patients',
        component: PatientsComponent,
        data: {
          title: 'Patients',
          breadcrumb: 'Patients'
        }
      },          
      {
        path: 'devices',
        component: DevicesComponent,
        data: {
          title: 'Devices',
          breadcrumb: 'Devices'
        },
        children: [
          {
            path: '',
            component: DevicesListComponent,
            data: {
              title: 'Devices',
              breadcrumb: 'Devices'
            }
          },
          {
            path: ':device_id',
            component: DevicesContainerComponent,
            children: [
              // {
              //   path: '',
              //   redirectTo: 'details',
              // },
              // {
              //   path: 'details',
              //   component: DeviceDetailsComponent,
              //   data: {
              //     title: 'Details',
              //     breadcrumb: 'Details'
              //   }
              // },
              {
                path: 'raw-reports',
                component: DeviceRawReportsComponent,
                data: {
                  title: 'Raw-Reports',
                  breadcrumb: 'Raw-Reports'
                }
              },
              {
                path: 'parsed-reports',
                component: DeviceParsedReportsComponent,
                data: {
                  title: 'Parsed-Reports',
                  breadcrumb: 'Parsed-Reports'
                }
              },
              // {
              //   path: 'reports',
              //   component: DeviceReportsComponent,
              //   data: {
              //     title: 'Reports',
              //     breadcrumb: 'Reports'
              //   }
              // },
              // {
              //   path: 'settings',
              //   component: DeviceSettingsComponent,
              //   data: {
              //     title: 'Settings',
              //     breadcrumb: 'Settings'
              //   }
              // },
              // {
              //   path: 'commands',
              //   component: DeviceCommandsComponent,
              //   data: {
              //     title: 'Commands',
              //     breadcrumb: 'Commands'
              //   }
              // }
            ]
          }
        ]
    
      },


      {
        path: 'SCM',
        component: ReportsComponent,
        data: {
          title: 'SCM',
          breadcrumb: 'SCM'
        }
      }, 
      {
        path: 'nursing-homes',
        component: NursingHomeComponent,
        data: {
          title: 'Nursing Homes',
          breadcrumb: 'NursingHome'
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
