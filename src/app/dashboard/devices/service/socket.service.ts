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
    private deviceClient = null;

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

    connectClient(): void {

        if (!this.deviceClient) {
            this.deviceClient = io(`${environment.socketHost}/devices/logs?token=${this._token}&device_id=1&application=moio_management`);
        } else if (this.deviceClient && this.deviceClient.disconnected) {
            this.deviceClient.open();
        }

    }

    /**
     * close socket connection
     * @param client name of the client to close: notifications | patient_history
     */
    disconnectClient(): void {

        if (this.deviceClient) {
            this.deviceClient.close();
            this.deviceClient = null;
        }

    }

    /**
     * subscribe to a room on the server
     * @param client: string patient_history | notifications
     * @param id: number patient_id | user_id
     */
    subscribe(id: number) {
        this.emit('subscribe', id);
    }

    /**
     * unsubscribe from a room
     * @param client: string patient_history | notifications
     * @param id: number patient_id | user_id
     */
    unsubscribe(client, id: number) {
        this.emit('unsubscribe', id);
    }

    emit(topic: string, id: number) {

        if (this.deviceClient) {
            if (this.deviceClient.disconnected) {
                this.deviceClient.open();
            }
            this.deviceClient.emit(topic, id);
        }

    }

    onLog(): Observable<any> {
        return new Observable(observer => {
            this.deviceClient.on('device_logs', (data) => observer.next(data));
        });
    }

    onReport(): Observable<any> {
        return new Observable(observer => {
            this.deviceClient.on('device_reports', (data) => observer.next(data));
        });
    }

}
