import {Component, OnInit, Input} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'moio-device-data',
    templateUrl: './device-data.component.html',
    styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {

    @Input('log') log: any;
    @Input('rawView') rawView: string;

    dataBeautify: string;


    constructor(public translate: TranslateService) {
        translate.setDefaultLang('de');
    }

    ngOnInit() {


    }


}
