import {Action} from '@ngrx/store';
import {IDeviceLogs} from '../../model/device-logs.model';

export enum DeviceReportsActionTypes {
    IncomingReport = '[Devices/Reports] Incoming Reports',
    DeleteReport = '[Devices/Reports] Delete Report',
    DeleteAllReport = '[Devices/Reports] Delete All Report'
}

export class IncomingReport implements Action {

    readonly type = DeviceReportsActionTypes.IncomingReport;

    constructor(public payload: { deviceReports: IDeviceLogs }) {
    }

}

export class DeleteReport implements Action {

    readonly type = DeviceReportsActionTypes.DeleteReport;

    constructor(public payload: { id: string }) {
    }

}

export class DeleteAllReport implements Action {

    readonly type = DeviceReportsActionTypes.DeleteAllReport;

}

export type DeviceReportsActionsUnion =
    | IncomingReport
    | DeleteReport
    | DeleteAllReport;


