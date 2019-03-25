import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'moio-device-command',
    templateUrl: './device-command.component.html'
})
export class DeviceCommandComponent implements OnInit {

    @Input('log') log: any;
    @Input('rawView') rawView: string;

    constructor() {
    }

    ngOnInit() {

    }

}
