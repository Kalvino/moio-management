import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'moio-device-data',
    templateUrl: './device-data.component.html'
})
export class DeviceDataComponent implements OnInit {

    @Input('log') log: any;
    @Input('rawView') rawView: string;

    dataBeautify: string;


    constructor() {

    }

    ngOnInit() {


    }


}
