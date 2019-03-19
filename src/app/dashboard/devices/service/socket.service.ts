import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
// import * as fromAuth from '../../auth/reducers';
// import {NotificationActions} from '../../home/actions';

/**
 * Socket service provides an interface
 * for socket.io client connections
 *
 * it will create two clients for notifications and patient_events
 */
@Injectable({
    providedIn: 'root'
})
export class SocketService {

    /**
     * instance of socket client for notifications
     */
    private deviceLogsClient = null;

    /**
     * current user
     */
    private _currentUser = null;

    /**
     * current access token
     */
    private _token = null;

    constructor(private store: Store<any>) {

        this.store.pipe(select(fromAuth.getUser)).subscribe(
            user => {
                this._currentUser = user;
            });


        // subscribe to get the current access_token from the store
        this.store.pipe(
            select(fromAuth.getAccessToken)
        ).subscribe(token => {
            this._token = token;
        });

    }

    /**
     * create client or open / re-open connection of the client
     * @param client name of the client: 'notifications | patient_history
     */
    connectClient(client: string): void {

        if (client === 'device_logs') {

            if (!this.deviceLogsClient) {

                this.deviceLogsClient =
                    io(`${environment.socketHost}/devices/logs?token=${this._token}&device_id=1`);

            } else if (this.deviceLogsClient && this.deviceLogsClient.disconnected) {

                this.deviceLogsClient.open();

            }
        }

    }

    /**
     * close socket connection
     * @param client name of the client to close: notifications | patient_history
     */
    disconnectClient(client): void {
        if (client === 'notifications') {
            if (this.deviceLogsClient) {
                this.deviceLogsClient.close();
                this.deviceLogsClient = null;
            }
        }

    }

    /**
     * subscribe to a room on the server
     * @param client: string patient_history | notifications
     * @param id: number patient_id | user_id
     */
    subscribe(client, id: number) {
        this.emit(client, 'subscribe', id);
    }

    /**
     * unsubscribe from a room
     * @param client: string patient_history | notifications
     * @param id: number patient_id | user_id
     */
    unsubscribe(client, id: number) {
        this.emit(client, 'unsubscribe', id);
    }

    emit(client: string, topic: string, id: number) {
        switch (client) {

            case 'device_logs':
                if (this.deviceLogsClient) {
                    if (this.deviceLogsClient.disconnected) {
                        this.deviceLogsClient.open();
                    }
                    this.deviceLogsClient.emit(topic, id);
                }
                break;
        }
    }

    onLog(): Observable<any> {
        return new Observable(observer => {
            this.deviceLogsClient.on('device_logs', (data) => observer.next(data));
        });
    }


}
